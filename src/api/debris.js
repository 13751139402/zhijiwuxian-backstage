/*
 * @Author: your name
 * @Date: 2020-03-25 17:26:22
 * @LastEditTime: 2020-03-31 18:20:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\api\debirs.js
 */
import request from "@/utils/request";


// --------------------  碎片  ------------------->
export function getArticlesDebrisList(params) {
    return request({
        url: "/debris/getArticlesDebrisList",
        method: "get",
        params
    });
}

export function addArticlesDebrisList(data) {
    return request({
        url: "/debris/addArticlesDebrisList",
        method: "post",
        data
    });
}

export function updateArticlesDebrisList(data) {
    return request({
        url: "/debris/updateArticlesDebrisList",
        method: "post",
        data
    });
}

export function delArticlesDebrisList(data) {
    return request({
        url: "/debris/delArticlesDebrisList",
        method: "post",
        data
    });
}


// --------------------  卡片  ------------------->
export function getArticlesCard(params) {
    return request({
        url: "/debris/getArticlesCard",
        method: "get",
        params
    });
}

export function addArticlesCard(data) {
    return request({
        url: "/debris/addArticlesCard",
        method: "post",
        data
    });
}

export function updateArticlesCard(data) {
    return request({
        url: "/debris/updateArticlesCard",
        method: "post",
        data
    });
}

export function delArticlesCard(data) {
    return request({
        url: "/debris/delArticlesCard",
        method: "post",
        data
    });
}

// --------------------  物品  ------------------->
export function getArticlesDebris(params) {
    return request({
        url: "/debris/getArticlesDebris",
        method: "get",
        params
    });
}

export function addArticles(data) {
    return request({
        url: "/debris/addArticles",
        method: "post",
        data
    });
}

export function updateArticles(data) {
    return request({
        url: "/debris/updateArticles",
        method: "post",
        data
    });
}

export function delArticles(data) {
    return request({
        url: "/debris/delArticles",
        method: "post",
        data
    });
}

// --------------------  banner  ------------------->
export function getArticlesBanner(params) {
    return request({
        url: "/debris/getArticlesBanner",
        method: "get",
        params
    });
}

export function addArticlesBanner(data) {
    return request({
        url: "/debris/addArticlesBanner",
        method: "post",
        data
    });
}

export function updateArticlesBanner(data) {
    return request({
        url: "/debris/updateArticlesBanner",
        method: "post",
        data
    });
}

export function delArticlesBanner(data) {
    return request({
        url: "/debris/delArticlesBanner",
        method: "post",
        data
    });
}

// --------------------  宝箱配置  ------------------->
export function getArticlesBox(params) {
    return request({
        url: "/debris/getArticlesBox",
        method: "get",
        params
    });
}

export function addArticlesBox(data) {
    return request({
        url: "/debris/addArticlesBox",
        method: "post",
        data
    });
}

export function updateArticlesBox(data) {
    return request({
        url: "/debris/updateArticlesBox",
        method: "post",
        data
    });
}

export function delArticlesBox(data) {
    return request({
        url: "/debris/delArticlesBox",
        method: "post",
        data
    });
}

// --------------------  彩票  ------------------->
export function updateArticlesLottery(data) {
    return request({
        url: "/debris/updateArticlesLottery",
        method: "post",
        data
    });
}

export function addArticlesLottery(data) {
    return request({
        url: "/debris/addArticlesLottery",
        method: "post",
        data
    });
}

export function getArticlesLottery(params) {
    return request({
        url: "/debris/getArticlesLottery",
        method: "get",
        params
    });
}

export function delArticlesLottery(data) {
    return request({
        url: "/debris/delArticlesLottery",
        method: "post",
        data
    });
}
