function shippingCall(){var e=document.getElementById("shipping-calculator-block");"none"===e.style.display?e.style.display="block":e.style.display="none"}"object"==typeof Countries&&(Countries.updateProvinceLabel=function(e,t){if("string"==typeof e&&Countries[e]&&Countries[e].provinces){if("object"!=typeof t&&null===(t=document.getElementById("address_province_label")))return;t.innerHTML=Countries[e].label;var n=jQuery(t).parent();n.find("select"),n.find(".custom-style-select-box-inner").html(Countries[e].provinces[0])}}),"undefined"==typeof Shopify.Cart&&(Shopify.Cart={}),Shopify.Cart.ShippingCalculator=function(){var _config={submitButton:"Calculate shipping",submitButtonDisabled:"Calculating...",templateId:"shipping-calculator-response-template",wrapperId:"wrapper-response",customerIsLoggedIn:!1,moneyFormat:"${{amount}}"},_render=function(e){var t=jQuery("#"+_config.templateId),n=jQuery("#"+_config.wrapperId);if(t.length&&n.length){var r={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var a,i=Handlebars.compile(jQuery.trim(t.text()))(e);if(jQuery(i).appendTo(n),"undefined"!=typeof Currency&&"function"==typeof Currency.convertAll){var s="";jQuery("[name=currencies]").size()?s=jQuery("[name=currencies]").val():jQuery("#currencies span.selected").size()&&(s=jQuery("#currencies span.selected").attr("data-currency")),""!==s&&Currency.convertAll(shopCurrency,s,"#wrapper-response span.money, #estimated-shipping span.money")}}},_enableButtons=function(){jQuery(".get-rates").removeAttr("disabled").removeClass("disabled").val(_config.submitButton)},_disableButtons=function(){jQuery(".get-rates").val(_config.submitButtonDisabled).attr("disabled","disabled").addClass("disabled")},_getCartShippingRatesForDestination=function(e){var t={type:"POST",url:"/cart/prepare_shipping_rates",data:jQuery.param({shipping_address:e}),success:_pollForCartShippingRatesForDestination(e),error:_onError};jQuery.ajax(t)},_pollForCartShippingRatesForDestination=function(e){var t=function(){jQuery.ajax("/cart/async_shipping_rates",{dataType:"json",success:function(n,r,a){200===a.status?_onCartShippingRatesUpdate(n.shipping_rates,e):setTimeout(t,500)},error:_onError})};return t},_fullMessagesFromErrors=function(e){var t=[];return jQuery.each(e,(function(e,n){jQuery.each(n,(function(n,r){t.push(e+" "+r)}))})),t},_onError=function(XMLHttpRequest,textStatus){jQuery("#estimated-shipping").hide(),jQuery("#estimated-shipping em").empty(),_enableButtons();var feedback="",data=eval("("+XMLHttpRequest.responseText+")");feedback=data.message?data.message+"("+data.status+"): "+data.description:"Error : "+_fullMessagesFromErrors(data).join("; ")+".","Error : country is not supported."===feedback&&(feedback="We do not ship to this destination."),_render({rates:[],errorFeedback:feedback,success:!1}),jQuery("#"+_config.wrapperId).show()},_onCartShippingRatesUpdate=function(e,t){_enableButtons();var n="";if(t.zip&&(n+=t.zip+", "),t.province&&(n+=t.province+", "),n+=t.country,e.length){"0.00"==e[0].price?jQuery("#estimated-shipping em").html("FREE"):jQuery("#estimated-shipping em").html(_formatRate(e[0].price));for(var r=0;r<e.length;r++)e[r].price=_formatRate(e[r].price)}_render({rates:e,address:n,success:!0}),jQuery("#"+_config.wrapperId+", #estimated-shipping").fadeIn()},_formatRate=function(e){function t(e,t){return"undefined"==typeof e?t:e}function n(e,n,r,a){if(n=t(n,2),r=t(r,","),a=t(a,"."),isNaN(e)||null==e)return 0;var i=(e=(e/100).toFixed(n)).split("."),s,o;return i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+r)+(i[1]?a+i[1]:"")}if("function"==typeof Shopify.formatMoney)return Shopify.formatMoney(e,_config.moneyFormat);"string"==typeof e&&(e=e.replace(".",""));var r="",a=/\{\{\s*(\w+)\s*\}\}/,i=_config.moneyFormat;switch(i.match(a)[1]){case"amount":r=n(e,2);break;case"amount_no_decimals":r=n(e,0);break;case"amount_with_comma_separator":r=n(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":r=n(e,0,".",",")}return i.replace(a,r)};return _init=function(){new Shopify.CountryProvinceSelector("address_country","address_province",{hideElement:"address_province_container"});var e=jQuery("#address_country"),t=jQuery("#address_province_label").get(0);"undefined"!=typeof Countries&&(Countries.updateProvinceLabel(e.val(),t),e.change((function(){Countries.updateProvinceLabel(e.val(),t)}))),jQuery(".get-rates").click((function(){_disableButtons(),jQuery("#"+_config.wrapperId).empty().hide();var e={};e.zip=jQuery("#address_zip").val()||"",e.country=jQuery("#address_country").val()||"",e.province=jQuery("#address_province").val()||"",_getCartShippingRatesForDestination(e)})),_config.customerIsLoggedIn&&jQuery(".get-rates:eq(0)").trigger("click")},{show:function(e){e=e||{},jQuery.extend(_config,e),jQuery((function(){_init()}))},getConfig:function(){return _config},formatRate:function(e){return _formatRate(e)}}}(),Shopify.Cart.ShippingCalculator.show({submitButton:theme.strings.shippingCalcSubmitButton,submitButtonDisabled:theme.strings.shippingCalcSubmitButtonDisabled,customerIsLoggedIn:theme.strings.shippingCalcCustomerIsLoggedIn,moneyFormat:theme.strings.shippingCalcMoneyFormat}),$(".qtyplus1").on("click",(function(e){e.preventDefault();var t=parseInt($(this).parent().find('input[name="updates[]"]').val());isNaN(t)?$(this).parent().find('input[name="updates[]"]').val(1):$(this).parent().find('input[name="updates[]"]').val(t+1),$("input[name='update']").trigger("click")})),$(".qtyminus1").on("click",(function(e){e.preventDefault();var t=parseInt($(this).parent().find('input[name="updates[]"]').val());!isNaN(t)&&t>0?$(this).parent().find('input[name="updates[]"]').val(t-1):$(this).parent().find('input[name="updates[]"]').val(1),$("input[name='update']").trigger("click")})),$(".cart_heading").on("click",(function(){jQuery(this).hasClass("clicked")?$(this).removeClass("clicked"):$(this).addClass("clicked")}));
//# sourceMappingURL=/s/files/1/0108/7370/0415/t/9/assets/dT_shipping-cart.js.map?v=4107990818448521407
