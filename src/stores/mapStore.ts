// src/stores/mapStore.ts
import { atom } from 'nanostores'

// 初始值设为 null，表示刚进来没有选中任何特殊地点
// 或者你可以设为起点的 ID，比如 'start-point'
export const currentStopId = atom<string | null>(null)
