"use strict";const t=require("../utils/request.js");exports.getAllBlogArticleApi=function(r){return t.get("/articles-with-stats",r,{loading:!1,showError:!1})};
