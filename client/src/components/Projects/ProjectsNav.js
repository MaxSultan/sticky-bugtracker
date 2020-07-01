import React, { useState} from 'react'
import { Menu } from 'semantic-ui-react'

export default function ProjectsNav({ showForm, setShowForm}) {
  const [activeItem, setActiveItem] = useState('projects')

  const handleItemClick = (e) => setActiveItem(e.target.name)

    return (
      <Menu tabular>
        <Menu.Item
          name='all projects'
          active={activeItem === 'active projects'}
          onClick={() => handleItemClick}
        />
        <Menu.Item
          name='add'
          active={activeItem === 'add'}
          onClick={() => handleItemClick, () => setShowForm(!showForm)}
        />
         <Menu.Item
          name='filter projects by'
          active={activeItem === 'archived projects'}
          onClick={() => handleItemClick}
        />
      </Menu>
    )
}