import fetch from '@/utils/axios'

//获取访问者ip
export const signIpApi = () => fetch.post('/signip');

//新建wall
export const insertWallApi = data => fetch.post('/insertWall',data);