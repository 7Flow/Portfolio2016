this["Tpl"] = this["Tpl"] || {};

this["Tpl"]["app/tpl/about.html"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});

this["Tpl"]["app/tpl/cv.html"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div>\n            <h4>"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "</h4>\n            <h5>"
    + alias4(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"company","hash":{},"data":data}) : helper)))
    + "</h5>\n            <h6>"
    + alias4(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.to : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</h6>\n            <p>\n                "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            </p>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " - "
    + container.escapeExpression(((helper = (helper = helpers.to || (depth0 != null ? depth0.to : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"to","hash":{},"data":data}) : helper)));
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div>\n            <h4>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n            <h5>"
    + alias4(((helper = (helper = helpers.school || (depth0 != null ? depth0.school : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"school","hash":{},"data":data}) : helper)))
    + "</h5>\n            <h6>"
    + alias4(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.to : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</h6>\n            <p>\n                "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            </p>\n        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        --><li id=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"chart "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n            <h4>"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</h4>\n            <canvas></canvas>\n        </li><!--\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "<div class=\"timeline\">\n    <article>\n        <h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.xp : depth0)) != null ? stack1.title : stack1), depth0))
    + "<span class=\"fx\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.xp : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span></h2>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.xp : depth0)) != null ? stack1.dates : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </article>\n\n    <article>\n        <h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.education : depth0)) != null ? stack1.title : stack1), depth0))
    + "<span class=\"fx\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.education : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span></h2>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.education : depth0)) != null ? stack1.dates : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </article>\n</div>\n\n<article>\n    <h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.skills : depth0)) != null ? stack1.title : stack1), depth0))
    + "<span class=\"fx\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.skills : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span></h2>\n    <ul><!--\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.skills : depth0)) != null ? stack1.domain : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    --></ul>\n</article>";
},"useData":true});

this["Tpl"]["app/tpl/gamePopin.html"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"paragraph\">\n            <h4 class=\"js-random-poly\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<span class=\"fx\" aria-hidden=\"true\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h4>\n            <p>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <a class=\"button js-random-btn "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.swf : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" data-width=\""
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "\" data-height=\""
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + "\">Jouer</a>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "js-popup";
},"6":function(container,depth0,helpers,partials,data) {
    return "            <li>\n                <img src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" alt=\"Capture d'écran\" aria-labelledby=\"popin-game-title\" aria-describedby=\"popin-game-desc\" />\n            </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n    <button class=\"icon-close invisible-text js-close js-random-btn\"><span hidden>Fermer</span></button>\n\n    <div class=\"title\">\n        <h1 id=\"popin-game-title\" class=\"js-random-poly\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<span class=\"fx\" aria-hidden=\"true\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h1>\n        <h3 id=\"popin-game-desc\">"
    + alias4(((helper = (helper = helpers.client || (depth0 != null ? depth0.client : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"client","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n\n    <div class=\"description\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.link : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n    <figure>\n        <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.screenshots : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </figure>";
},"useData":true});

this["Tpl"]["app/tpl/games.html"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    --><div class=\"page\">\n        <ul><!--\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        --></ul>\n    </div><!--\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            --><li>\n                <a href=\"javascript:void(0);\" data-json=\"json/games/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ".json\" aria-haspopup=\"true\">\n                    <div class=\"highlight\"></div>\n                    <div class=\"thumb\">\n                        <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\"Capture d'écran du jeu\" aria-labelledby=\"game-title-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" aria-describedby=\"game-desc-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n                    <div class=\"overlay\" style=\"background: url("
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + ") no-repeat 0 0/cover;\"></div>\n                    <div class=\"details\">\n                        <div class=\"valign\">\n                            <h2 id=\"game-title-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<span class=\"fx\" aria-hidden=\"true\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h2>\n                            <h3 id=\"game-desc="
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"label\">"
    + alias4(((helper = (helper = helpers.client || (depth0 != null ? depth0.client : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"client","hash":{},"data":data}) : helper)))
    + "</h3>\n                            <hr/>\n                            <span>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = helpers.techno || (depth0 != null ? depth0.techno : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"techno","hash":{},"data":data}) : helper)))
    + "</span>\n                        </div>\n                    </div>\n                </a>\n            </li><!--\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <li class=\"js-random-btn "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.first),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-index=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n        <button><span hidden>Allez à la page "
    + alias2(alias1(depth0, depth0))
    + "</span></button>\n    </li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "first active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<svg width=\"0\" height=\"0\">\n    <defs>\n        <clipPath id=\"panel-over\" clipPathUnits=\"objectBoundingBox\">\n            <polygon points=\"0 0.25, 1 0.25, 1 0.75, 0 0.75\" />\n        </clipPath>\n        <clipPath id=\"panel-out\" clipPathUnits=\"objectBoundingBox\">\n            <polygon points=\"0 0.25, 0 0.25, 0 0.75, 0 0.75\" />\n        </clipPath>\n    </defs>\n</svg>\n\n<div class=\"all-pages\"><!--\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "--></div>\n\n<button class=\"controls previous js-random-bg icon-navigate_before\"><span hidden>Page précédente</span></button>\n\n<ul class=\"pagination\">\n"
    + ((stack1 = (helpers.times || (depth0 && depth0.times) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.num : depth0),{"name":"times","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n\n<button class=\"controls next js-random-bg icon-navigate_next\"><span hidden>Page suivante</span></button>\n";
},"useData":true});

this["Tpl"]["app/tpl/intro.html"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-background\">\n    <img id=\"img-map\" src=\"images/nmap.jpg\"/>\n    <img id=\"img-source\" src=\"images/milky-way.jpg\"/>\n\n    <canvas id=\"source\" class=\"hidden\" width=\"1800\" height=\"1164\"></canvas>\n    <canvas id=\"map\" class=\"hidden\" width=\"170\" height=\"170\"></canvas>\n</div>\n\n<div class=\"content\">\n    <blockquote>\n        <p>Hello,</p>\n        <p>Je suis un développeur web</p>\n        <p class=\"blablabla\">et <i>bla</i><i>bla</i><i>bla</i></p>\n        <p>Essayons de faire plus original...</p>\n        <p>Mais je ne suis pas graphiste... ça se voit -_-'</p>\n        <p>Un retour dans les 90's, ça vous tente ?</p>\n    </blockquote>\n\n    <div style=\"margin: 0 auto; text-align: center; width: 80%;\">\n        <a class=\"btn-discover\">\n            <svg>\n                <defs>\n                    <linearGradient id=\"cv-linear-grd\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n                        <stop offset=\"0%\" stop-color=\"#89132D\"><animate attributeName=\"stop-color\" values=\"#124e54;#27A69B;#3acba9;#124e54\" dur=\"5s\" repeatCount=\"indefinite\"></animate></stop>\n                        <stop offset=\"33%\" stop-color=\"#B51F22\"><animate attributeName=\"stop-color\" values=\"#27A69B;#3acba9;#124e54;#27A69B\" dur=\"5s\" repeatCount=\"indefinite\"></animate></stop>\n                        <stop offset=\"66%\" stop-color=\"#FF9100\"><animate attributeName=\"stop-color\" values=\"#3acba9;#124e54;#27A69B;#3acba9;\" dur=\"5s\" repeatCount=\"indefinite\"></animate></stop>\n                    </linearGradient>\n                </defs>\n                <rect x=\"0\" y=\"0\" fill=\"none\" width=\"100%\" height=\"100%\" stroke=\"url(#cv-linear-grd)\"></rect>\n            </svg>\n            <span>Découvrir</span>\n        </a>\n    </div>\n</div>";
},"useData":true});

this["Tpl"]["app/tpl/websitePopin.html"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"paragraph\">\n        <h4 class=\"js-random-poly\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<span class=\"fx\" aria-hidden=\"true\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h4>\n        <p>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <a class=\"button js-random-btn\" href=\""
    + container.escapeExpression(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Decouvrir</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <li class=\"js-breakable\">\n            <img class=\"js-container\" src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" alt=\"Capture d'écran\" aria-labelledby=\"popin-website-title\" aria-describedby=\"popin-website-desc\" />\n        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<button class=\"icon-close invisible-text js-close js-random-btn\"><span hidden>Fermer</span></button>\n\n<div class=\"title\">\n    <h1 id=\"popin-website-title\" class=\"js-random-poly\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<span class=\"fx\" aria-hidden=\"true\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h1>\n    <h3 id=\"popin-website-desc\">"
    + alias4(((helper = (helper = helpers.client || (depth0 != null ? depth0.client : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"client","hash":{},"data":data}) : helper)))
    + "</h3>\n</div>\n\n<div class=\"description\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.link : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n<figure>\n    <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.screenshots : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</figure>\n\n<div id=\"domRenderer\" class=\"renderer\"></div>\n\n<canvas id=\"debug\" width=\"1300\" height=\"617\"></canvas>\n";
},"useData":true});

this["Tpl"]["app/tpl/websites.html"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "    --><div class=\"page "
    + ((stack1 = helpers["if"].call(alias1,(data && data.first),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n        <ul><!--\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        --></ul>\n    </div><!--\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "first active";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            --><li>\n                    <a href=\"javascript:void(0);\" data-json=\"json/websites/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ".json\" aria-haspopup=\"true\">\n                        <div class=\"highlight\"></div>\n                        <div class=\"thumb\">\n                            <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\"Capture d'écran du jeu\" aria-labelledby=\"website-title-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" aria-describedby=\"website-desc-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        </div>\n                        <div class=\"overlay\" style=\"background: url("
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + ") no-repeat 0 0/cover;\"></div>\n                        <div class=\"details\">\n                            <div class=\"valign\">\n                                <h2 id=\"website-title-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "<span class=\"fx\" aria-hidden=\"true\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h2>\n                                <h3 id=\"website-desc="
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"label\">"
    + alias4(((helper = (helper = helpers.client || (depth0 != null ? depth0.client : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"client","hash":{},"data":data}) : helper)))
    + "</h3>\n                                <hr/>\n                                <span>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span> - <span>"
    + alias4(((helper = (helper = helpers.techno || (depth0 != null ? depth0.techno : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"techno","hash":{},"data":data}) : helper)))
    + "</span>\n                            </div>\n                        </div>\n                    </a>\n            </li><!--\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <li class=\"js-random-btn "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.first),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-index=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n        <button><span hidden>Allez à la page "
    + alias2(alias1(depth0, depth0))
    + "</span></button>\n    </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n<svg width=\"0\" height=\"0\">\n    <defs>\n        <clipPath id=\"panel-over\" clipPathUnits=\"objectBoundingBox\">\n            <polygon points=\"0 0.25, 1 0.25, 1 0.75, 0 0.75\" />\n        </clipPath>\n        <clipPath id=\"panel-out\" clipPathUnits=\"objectBoundingBox\">\n            <polygon points=\"0 0.25, 0 0.25, 0 0.75, 0 0.75\" />\n        </clipPath>\n    </defs>\n</svg>\n\n<div class=\"all-pages\"><!--\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "--></div>\n\n<div class=\"controls previous js-random-bg\">\n    <button class=\"icon-navigate_before\"><span hidden>Page précédente</span></button>\n</div>\n\n<ul class=\"pagination\">\n"
    + ((stack1 = (helpers.times || (depth0 && depth0.times) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.num : depth0),{"name":"times","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n\n<div class=\"controls next js-random-bg\">\n    <button class=\"icon-navigate_next\"><span hidden>Page suivante</span></button>\n</div>\n";
},"useData":true});