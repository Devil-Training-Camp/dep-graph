<template>
  <el-container>
    <el-header>
      <h1>Dependency Graph</h1>
    </el-header>
    <el-main>
      <Loading v-if="loading" />
      <DependencyGraph v-else :data="dependencyData" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import DependencyGraph from '@/components/DependencyGraph.vue'
import Loading from '@/components/Loading.vue'
import 'element-plus/dist/index.css'
import { ref, onMounted } from 'vue'
import { type DepGraphNode } from '../types/graph'

const dependencyData = ref<DepGraphNode[]>([])
const loading = ref(false)

// 获取依赖关系图数据
const getDependencyGraph = async (): Promise<DepGraphNode[]> => {
  loading.value = true

  try {
    const response = await fetch('/api/graph-data')
    dependencyData.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
  return dependencyData.value
}

onMounted(() => {
  getDependencyGraph()
})
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}
</style>
