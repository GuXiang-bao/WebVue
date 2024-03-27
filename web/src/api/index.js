import fetch from '@/utils/axios'

//获取访问者ip
export const signIpApi = () => fetch.post('/signip');

//新建wall
export const insertWallApi = data => fetch.post('/insertwall',data);

//查询墙
export const findWallPageApi = data => fetch.post('/findwallpage',data);

//反馈
export const insertFeedbackApi = data => fetch.post('/insertfeedback',data);