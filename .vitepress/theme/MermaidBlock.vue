<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  code: string
}>()

const { isDark } = useData()
const svgHtml = ref('')

function decodeBase64Utf8(b64: string): string {
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function renderDiagram() {
  if (typeof window === 'undefined') return
  const mermaid = (await import('mermaid')).default
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark.value ? 'dark' : 'default',
    securityLevel: 'loose'
  })
  const source = decodeBase64Utf8(props.code)
  const id = `vp2-mermaid-${Math.random().toString(36).slice(2, 10)}`
  const { svg } = await mermaid.render(id, source)
  svgHtml.value = svg
}

onMounted(() => {
  void renderDiagram()
})

watch(isDark, () => {
  void renderDiagram()
})
</script>

<template>
  <div class="vp2-mermaid-box" v-html="svgHtml"></div>
</template>

<style scoped>
.vp2-mermaid-box {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  justify-content: center;
  overflow-x: auto;
}
</style>
