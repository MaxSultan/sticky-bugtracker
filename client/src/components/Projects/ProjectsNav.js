import React, { useState} from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default function ProjectsNav({ showForm, setShowForm}) {
  const [activeItem, setActiveItem] = useState('projects')

  const handleItemClick = (e) => setActiveItem(e.target.name)

    return (
      <Menu tabular style={styles.projectMenu}>
        <Menu.Item
          name='all projects'
          active={activeItem === 'active projects'}
          onClick={() => handleItemClick}
        />
        <Menu.Item
          active={activeItem === 'add'}
          onClick={() => handleItemClick, () => setShowForm(!showForm)}
        ><Icon name='add'/></Menu.Item>
         <Menu.Item
          name='filter projects by'
          active={activeItem === 'archived projects'}
          onClick={() => handleItemClick}
        />
      </Menu>
    )
}

const styles = {
  projectMenu: {
    backgroundColor: '#909aa7'
  }
}