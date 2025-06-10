import React from 'react'
import { ToolType } from '../App'

interface Tool {
  id: ToolType
  name: string
  icon: React.ComponentType<any>
  description: string
}

interface TabNavigationProps {
  tools: Tool[]
  activeTool: ToolType
  onToolChange: (tool: ToolType) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tools, activeTool, onToolChange }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-wrap gap-2 justify-center">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = activeTool === tool.id
          
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={`tab-button ${isActive ? 'tab-active' : 'tab-inactive'} flex items-center gap-2 px-4 py-3`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tool.name}</span>
            </button>
          )
        })}
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <select
          value={activeTool}
          onChange={(e) => onToolChange(e.target.value as ToolType)}
          className="w-full input-field text-center font-medium"
        >
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            {tools.find(tool => tool.id === activeTool)?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TabNavigation