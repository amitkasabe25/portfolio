import { getProjects } from '../actions/project.service'
import MyWorkClient from './MyWorkClient'

const MyWork = async () => {

 

  const projects = await getProjects()



  return (
    <MyWorkClient projects={projects} />
  )
}

export default MyWork