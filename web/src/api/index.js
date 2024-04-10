import fetch from '@/utils/axios'

//获取访问者ip
export const signIpApi = () => fetch.post('/signip');

//新建wall
export const insertWallApi = data => fetch.post('/insertwall',data);

//查询墙
export const findWallPageApi = data => fetch.post('/findwallpage',data);

//反馈
export const insertFeedbackApi = data => fetch.post('/insertfeedback',data);

//评论
export const insertCommentApi = data => fetch.post('/insertcomment',data);

//获取评论
export const findCommentPagApi = data => fetch.post('/findcommentpage',data);

//上传图片
export const profileApi = data => fetch.post('/profile',data);

//删除墙
export const deleteWallApi = data => fetch.post('/deletewall',data);

//删除反馈
export const daleteFeedbackApi = data => fetch.post('/daletefeedback',data);

//删除评论
export const deleteCommentApi = data => fetch.post('/deletecomment',data);

