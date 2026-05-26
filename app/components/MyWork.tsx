import { getProjects } from '../actions/project.service'
import MyWorkClient from './MyWorkClient'

const MyWork = async () => {

  console.log('MYWORK SERVER COMPONENT RUNNING')

  const projects = await getProjects()

  console.log('FETCHED PROJECTS:', projects)

  return (
    <MyWorkClient projects={projects} />
  )
}

export default MyWork