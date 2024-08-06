interface Dependency {
  name: string
  version: string
  external: boolean
  dependencies: Dependency[]
}

interface NodeItem {
  id: string
}

interface LinkItem {
  source: string
  target: string
}

interface GraphData {
  nodes: NodeItem[]
  links: LinkItem[]
}

export const transformData = (data: Dependency[]): GraphData => {
  const nodes: NodeItem[] = []
  const links: LinkItem[] = []
  const nodeSet: Set<string> = new Set()

  function addNode(name: string) {
    if (!nodeSet.has(name)) {
      nodes.push({ id: name })
      nodeSet.add(name)
    }
  }

  function traverse(dependency: Dependency, parentName: string | null) {
    addNode(dependency.name)
    if (parentName) {
      links.push({ source: parentName, target: dependency.name })
    }
    dependency.dependencies.forEach((child) => traverse(child, dependency.name))
  }

  data.forEach((dependency) => traverse(dependency, null))

  return { nodes, links }
}

// const graphData = transformData(data)
// console.log(graphData, 'graphData')
