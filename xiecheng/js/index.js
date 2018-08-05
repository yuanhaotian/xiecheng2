/********banner start**********/
(function(){
	var obanner = document.querySelector("#banner");
	var oul = obanner.querySelector(".ul");
	var olis = oul.querySelectorAll("li");
	var otabs =  obanner.querySelectorAll(".tab li");
	var index = 1;//当前第[1]张
	var length = olis.length; 
	var time = null;
	
	obanner.ontouchstart = function(e){
		var aL = e.changedTouches[0].pageX;
		var sL = parseInt(getComputedStyle(oul).marginLeft);
		clearInterval(time);

		document.ontouchmove = function(e){
			var bL = e.changedTouches[0].pageX-aL;
			oul.style.marginLeft = bL+sL+"px";
		}
		document.ontouchend = function(e){
			document.ontouchmove = null;
			document.ontouchend = null;
			var eL = e.changedTouches[0].pageX-aL;

			if(eL<-30 && index<length-1 && index>0){
				index++;//左
			}else if(eL>30 && index<length-1 && index>0){
				index--;
			}
			oul.classList.add('tran');
			oul.style.marginLeft = -index*100+'%';
		}
	}
	oul.addEventListener("transitionend",function(){
		this.classList.remove('tran');
		if(index<=0){
			index = length-2;
			this.style.marginLeft = -index*100+'%';
		}else if(index>=length-1){
			index=1;
			this.style.marginLeft = -index*100+'%';
		}

		for(var i=0;i<otabs.length;i++){
			otabs[i].classList.remove('on');
		}
		otabs[index-1].classList.add('on');
		auto();
	});

	function auto(){
		clearInterval(time);
		time = setInterval(function(){
			index++;
			oul.classList.add('tran');
			oul.style.marginLeft = -index*100+'%';
		},6000);//时间比300大很多
	}
	auto();
})();
/********banner end**********/