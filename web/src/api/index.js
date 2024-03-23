import fetch from '@utils/axios'

//新建wall
export const insertWallApi = data => fetch.post('/insertWall',data);