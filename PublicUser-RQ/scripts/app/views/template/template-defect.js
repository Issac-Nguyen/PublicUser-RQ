define([], function() {
	return {
		text: '<a href="views/defect.html" style="background-color: #= color#"><div><div id="building" class="font12size">Building: #:building_name#</div><div class="image-defects"><div class="image-defect"><ul class="singlerowLi"><span class="font10size">Image defect: </span>#var arrImg = JSON.parse(arr_imageDefect); for(var i = 0; i < arrImg.length; i++) { # <li><img src="#= arrImg[i].dataURL #" width="30" height="30"/></li> # } #</ul></div><div class="image-resolve"><ul class="singlerowLi"><span class="font10size">Image resolved:</span># var arrImg = JSON.parse(arr_imageResolve); for(var i = 0; i < arrImg.length; i++) { # <li><img src="#= arrImg[i].dataURL #" width="30" height="30"/></li> # } #</ul></div></div></div></a>'
	}
})