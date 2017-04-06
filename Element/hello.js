Vue.component('bird-slider', {
	props: {
		value: {
			type: Number,
			default: 0
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 20
		},
		testData: {
			type: Number,
			default: 20
		},
	},
	template: '#birdSilderTmp',
	data: function() {
		return {
			oldValue: this.value,
			currentPosition: (this.value - this.min) / (this.max - this.min) * 100 + "%",
			startX: 0,
			currentX: 0,
			startPos: 0,
			newPos: null,
			tooltipShow: false,
		};
	},
	watch: {
		value: function(e) {
			var t = this;
			return this.$nextTick(function() {
				//t.updatePopper()
			});
			this.setPosition(100 * (e - this.min) / (this.max - this.min));
			//"number" != typeof e || isNaN(e) || e < this.min ? void this.$emit("input", this.min) : e > this.max ? void this.$emit("input", this.max) : (this.inputValue = e, void this.setPosition(100 * (e - this.min) / (this.max - this.min)))
		}
	},
	mounted: function() {
		var _that = this;
		this.$nextTick(function() {
			console.log(_that.value);
		})
	},
	methods: {
		onmouseenter: function() {},
		onDragStart: function(e) {
			document.onselectstart = function(e) {
				return false
			}; //禁止选择
			this.startX = e.clientX;
			this.startPos = parseInt(this.currentPosition, 10);
			this.tooltipShow = true;

			window.addEventListener("mousemove", this.onDragging);
			window.addEventListener("mouseup", this.onDragEnd)
		},
		onDragging: function(e) {
			//console.log("onDragging");
			this.currentX = e.clientX;
			//console.log(this.$refs.slider.clientWidth);

			var t = (this.currentX - this.startX) / this.$refs.slider.clientWidth * 100;
			this.newPos = this.startPos + t;
			//console.log(this.$refs.slider);
			//console.log(this.newPos);
			this.setPosition(this.newPos);

		},
		onDragEnd: function(e) {
			//console.log("onDragEnd");
			window.removeEventListener("mousemove", this.onDragging);
			window.removeEventListener("mouseup", this.onDragEnd);
			document.onselectstart = function(e) {
				return true
			}; //禁止选择
			this.tooltipShow = false;
		},
		setPosition: function(newPos) {
			newPos < 0 ? newPos = 0 : newPos > 100 && (newPos = 100);
			var t = 100 / ((this.max - this.min)),
				/*this.step*/
				n = Math.round(newPos / t),
				i = n * t * (this.max - this.min) * .01 + this.min;
			i = parseFloat(i.toFixed(this.precision));
			this.$emit("input", i);
			this.currentPosition = (this.value - this.min) / (this.max - this.min) * 100 + "%";
			//this.value !== this.oldValue && (this.$emit("change", this.value), this.oldValue = this.value);
		},
	},
	computed: {

	}
});

var vm = new Vue({
	el: '#app',
	data: function() {
		return {
			value1: 0,
			value2: 8,
			value3: 15
		}
	},
	methods: {
		parentInput: function() {
			//console.log("parentInput");
			//console.log(this.value2);
		},
		parentChange: function() {
			console.log("parentChange");
		},
	}
})
//评分
var test = new Vue({
	el: '#grade',
	data: function() {
		return {
			value1: null,
			value2: null,
			active: 0 //步骤条组件

		}
	},
	methods: {
		next: function() {
			if(this.active++ > 2) this.active = 0;
		},
		handit: function(msg) {
			//			console.log(msg)返回点击的index
		}
	},
	components: {
		'my-component': { //第一个组件
			template: '#myComponent',
			data: function() {
				return {
					items: [
						{ 'text': "", 'title': "非常不满意" },
						{ 'text': "", 'title': "不满意" },
						{ 'text': "", 'title': "满意" },
						{ 'text': "", 'title': "一般" },
						{ 'text': "", 'title': "非常好" }
					],
					setindex: -1,
					setindex1: -1,
					test: -1
				}
			},
			methods: {
				save: function(index) {
					this.test = index;
					this.setindex = index;

				},
				enter: function(index) {
					this.setindex = index;
				},
				out: function(index) {
					if(this.test == -1) {
						this.setindex = -1
					} else {
						this.setindex = this.test
					}
				}

			}
		},
		'my-component1': { //第二个组件
			template: '#myComponent1',
			data: function() {
				return {
					items: [
						{ 'text': "", 'title': "非常不满意" },
						{ 'text': "", 'title': "不满意" },
						{ 'text': "", 'title': "满意" },
						{ 'text': "", 'title': "一般" },
						{ 'text': "", 'title': "非常好" }
					],
					setindex: -1, //评分组件
					setindex1: -1, //评分组件
					test: -1, //评分组件

				}
			},
			methods: {
				save: function(index) {
					this.test = index;
					this.setindex = index;
					//					if(index < 2) {
					//						for(var i = 0; i <= index; i++) {
					//							this.$refs.index[i].style.color = "rgb(175, 104, 62)"
					//						}
					//						var n = index + 1;
					//						for(var j = n; j <= 4; j++) {
					//							this.$refs.index[j].style.color = ""
					//						}
					//					} else {
					//						for(var k = 0; k <= index; k++) {
					//							this.$refs.index[k].style.color = "rgb(247, 186, 42)"
					//						}
					//						var n = index + 1;
					//						if(n <= 4) {
					//							for(var j = n; j <= 4; j++) {
					//								this.$refs.index[j].style.color = ""
					//							}
					//						}
					//					}

				},
				enter: function(index) {
					this.setindex = index;
				},
				out: function(index) {
					if(this.test == -1) {
						this.setindex = -1
					} else {
						this.setindex = this.test
					}
				}
			}
		},
		'my-component3': {
			template: '#myComponent3',
			data: function() {
				return {
					onesteps: [
						{ 'name': 1, 'text': '步骤1' },
						{ 'name': 2, 'text': '步骤2' },
						{ 'name': 3, 'text': '步骤3' }
					],
					process1: 0,
					process2: -1
				}

			},
			methods: {
				add: function() {
					this.process1++;
					this.process2 = this.process1 - 1;
					if(this.process1 > 3) { //复原process1
						this.process1 = 0
					}
					this.$emit('child', this.process1);
				}
			}

		}

	}
})
//分页
var paging_ex = new Vue({
	el: '#paging'
})
var paging = new Vue({
	el: '#paging_w',
	methods: { //实例接收到点击页面的index
		accept: function(msg) { //默认页面为1,获取到当前page
			var n = msg + 1;
			console.log(n);
		}
	},
	components: {
		'my-componentpaging': {
			template: '#myComponentpaging',
			data: function() {
				return {
					pages: [
						{ "text": 1 },
						{ "text": 2 },
						{ "text": 3 },
						{ "text": 4 },
						{ "text": 5 }
					],
					getindex: 0,
					button_index: 0
				}
			},
			methods: {
				next: function() {
					if(this.getindex < 4) {
						this.getindex++;
						this.button_index = this.getindex
					}
				},
				pre: function() {
					if(this.getindex > 0) {
						this.getindex--;
						this.button_index = this.getindex
					}
				},
				set: function(index) {
					this.getindex = index;
					this.button_index = this.getindex;					
				}
			}
		}
	}
})
//style="color: rgb(247, 186, 42);"星星添加的颜色
//event.currentTarget获取当前点击元素
//var a = event.currentTarget;
//a.setAttribute("class","el-rate__icon el-icon-star-on")