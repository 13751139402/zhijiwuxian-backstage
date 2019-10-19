/*
 * @Description: 返回《title》元素的text
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 09:46:27
 * @LastEditors: Please set LastEditors
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) { // 如果页头有title 则组合
    return `${pageTitle} - ${title}`
  }
  return `${title}` // 没有则直接返回项目title
}
