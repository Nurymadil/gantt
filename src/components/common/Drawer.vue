<template>
  <div class="gt-operation-drawer" :style="drawerStyle">
    <!-- 系统设置 -->
    <div>
      <div class="gt-text-title" style="margin-bottom: 1rem">
        {{ title }}
      </div>

      <div style="display: inline-flex; gap: 1rem">
        <div style="display: inline-block">
          <div class="gt-text-secondary-title">
            {{ secondaryTitle }}
          </div>
          <div style="display: flex; gap: 0.5rem">
            <button
              class="gt-drawer-reset-btn"
              style="font-size: 10px"
              @click="() => changeColWidth('small')"
            >
              {{ smallTitle }}
            </button>
            <button
              class="gt-drawer-reset-btn"
              style="font-size: 10px"
              @click="() => changeColWidth('normal')"
            >
              {{ normalTitle }}
            </button>
            <button
              class="gt-drawer-reset-btn"
              style="font-size: 10px"
              @click="() => changeColWidth('large')"
            >
              {{ largeTitle }}
            </button>
          </div>
        </div>

        <div style="display: inline-block">
          <div class="gt-text-secondary-title">
            {{ rowHeightTitle }}
          </div>
          <x-slider
            v-model="rowHeight"
            style="margin: 5px 20px 10px 0px"
            :min="minRowHeight"
            :max="maxRowHeight"
          />
        </div>

        <div style="margin: auto 0">
          <button class="gt-drawer-reset-btn" @click="reset">
            {{ resetTitle }}
          </button>
        </div>
      </div>
    </div>

    <div style="margin-top: 1rem">
      <div class="gt-text-title" style="margin-bottom: 1rem">
        {{ ganttDisplayText }}
      </div>
      <div style="display: flex; gap: 1rem">
        <button
          class="gt-drawer-reset-btn"
          @click="() => updateGanttHeaderUnit('day')"
        >
          {{ day }}
        </button>
        <button
          class="gt-drawer-reset-btn"
          @click="() => updateGanttHeaderUnit('week')"
        >
          {{ week }}
        </button>
        <button
          class="gt-drawer-reset-btn"
          @click="() => updateGanttHeaderUnit('month')"
        >
          {{ month }}
        </button>
      </div>
    </div>

    <div class="gt-line gt-shadow" />

    <!-- 自定义内容 -->
    <component :is="settingsSlot" v-if="settingsSlot" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import useParam from "@/composables/useParam";
import { Variables } from "@/constants/vars";
import { parseNumber } from "@/utils/common";
// eslint-disable-next-line import/named
import { GanttColumnSize, HeaderDateUnit } from "@/typings/ParamOptions";
import XSlider from "./Slider.vue";

export default defineComponent({
  name: "GanttDrawer",
});
</script>

<script lang="ts" setup>
const props = defineProps({
  show: {
    type: Boolean,
  },
  title: {
    type: String,
    default: "System Settings",
  },
  secondaryTitle: {
    type: String,
    default: "Change column width",
  },
  smallTitle: {
    type: String,
    default: "small",
  },
  normalTitle: {
    type: String,
    default: "normal",
  },
  largeTitle: {
    type: String,
    default: "large",
  },
  ganttDisplayText: {
    type: String,
    default: "Gantt display unit",
  },
  day: {
    type: String,
    default: "day",
  },
  week: {
    type: String,
    default: "week",
  },
  month: {
    type: String,
    default: "month",
  },
  rowHeightTitle: {
    type: String,
    default: "Row height",
  },
  resetTitle: {
    type: String,
    default: "Reset",
  },
});

const { show } = toRefs(props);

const { GtParam } = useParam();

function changeColWidth(v: GanttColumnSize) {
  GtParam.setGanttOptions({ [Variables.key.columnSize]: v });
}

function changeRowHeight(v: number) {
  GtParam.rowHeight = v;
}

function reset() {
  GtParam.resetSize();
}

function updateGanttHeaderUnit(unit: HeaderDateUnit) {
  GtParam.headerUnit = unit;
}

const drawerStyle = computed(() => {
  return {
    "min-width": "200px",
    "max-width": "400px",
    right: show.value ? "0px" : "-410px",
  };
});

const settingsSlot = computed(() => GtParam.getSlot(Variables.slots.settings));
const rowHeight = computed({
  get: () =>
    parseNumber(GtParam.rowHeight, Variables.size.defaultContentRowHeight),
  set: (v) => changeRowHeight(v),
});
const minRowHeight = computed(() => Variables.size.minContentRowHeight);
const maxRowHeight = computed(() => Variables.size.maxContentRowHeight);
</script>

<style scoped lang="scss">
.gt-text-title {
  font-size: 1rem;
  font-weight: bold;
}

.gt-operation-drawer {
  height: 100%;
  padding: 20px;
  background-color: var(--x-content-bg-color);
  color: var(--x-text-color);
  position: absolute;
  z-index: 999;
  box-shadow: 0 0 10px 2px var(--x-content-border-color);
  transition: all 0.5s;
}

.gt-drawer-reset-btn {
  display: inline-block;
  background-color: var(--x-primary-color);
  border-radius: 5px;
  border: none;
  color: var(--x-text-color);
  padding: 0.2rem 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  &:hover {
    box-shadow: 1px 1px 5px 1px var(--x-content-border-color);
    transition: box-shadow 0.5s;
  }

  &:active {
    filter: brightness(0.9);
  }
}
.refresh-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("refresh-icon.png");
  background-size: cover;
  cursor: pointer;
}
</style>
