<template>
  <div class="calculator">
    <div class="display">
      {{ previous ? previous + operatorSymbol : '' }} 
      {{ current || '0' }}
    </div>

    <div @click="clear" class="btn operator">AC</div>
    <div @click="sign" class="btn operator">+/-</div>
    <div @click="percent" class="btn operator">%</div>
    <div @click="divide" class="btn operator">÷</div>
    
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="multiply" class="btn operator">×</div>
    
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="subtract" class="btn operator">-</div>
    
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="add" class="btn operator">+</div>
    
    <div @click="append('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '',      
      previous: null,   
      operator: null,   
      operatorClicked: false, 
      operatorSymbol: '', // 【新增】用于在显示屏上显示符号
    }
  },
  methods: {
    // 清除所有 (需要清除 operatorSymbol)
    clear() {
      this.current = '';
      this.previous = null;
      this.operator = null;
      this.operatorSymbol = ''; // 【修改】清空符号
    },
    sign() {
      this.current = this.current.charAt(0) === '-' ? 
        this.current.slice(1) : `-${this.current}`;
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    dot() {
      if (this.current.indexOf('.') === -1) {
        this.append('.');
      }
    },
    // 数字输入
    append(number) {
      if (this.operatorClicked) {
        this.current = '';
        this.operatorClicked = false;
      }
      if (this.current.length < 15) {
          this.current = `${this.current}${number}`;
      }
    },
    
    // 【修改】设置运算符 (增加了 symbol 参数)
    setOperator(operatorFn, symbol) {
      // 如果已经有 previous 和 operator，说明用户想链式运算，先计算上一步
      if (this.operator && this.previous) {
        this.equal();
      }
      
      this.previous = this.current;
      this.operator = operatorFn;
      this.operatorSymbol = symbol; // 【新增】存储符号
      this.operatorClicked = true;
    },
    
    // 四则运算 (传入符号)
    divide() { this.setOperator((a, b) => a / b, ' ÷ '); },
    multiply() { this.setOperator((a, b) => a * b, ' × '); },
    subtract() { this.setOperator((a, b) => a - b, ' - '); },
    add() { this.setOperator((a, b) => a + b, ' + '); },
    
    // 计算结果 (需要清除 operatorSymbol)
    equal() {
      if (!this.operator || !this.previous) return;
      
      const result = this.operator(
        parseFloat(this.previous), 
        parseFloat(this.current)
      );
      
      this.current = String(parseFloat(result.toFixed(10)));
      this.previous = null;
      this.operator = null;
      this.operatorSymbol = ''; // 【修改】计算完成后清空符号
    }
  }
}
</script>

<style scoped>
/* 计算器容器样式 */
.calculator {
  margin: 0 auto;
  width: 300px; /* 调整宽度以适应 4 列布局 */
  font-size: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 列平均分配 */
  grid-auto-rows: minmax(60px, auto); /* 行高 */
  background-color: #333;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
}

/* 显示屏样式 */
.display {
  grid-column: 1 / 5;
  background-color: #000;
  color: white;
  text-align: right;
  padding: 10px 20px; /* 调整 padding 适应两行文本 */
  font-size: 1.8em;   /* 稍微调小字号 */
  line-height: 1.2;
  overflow: hidden;
  white-space: pre-wrap; /* 允许换行，但在这里是单行显示上一个值+符号，下一行显示 current */
  
  /* 我们可以用一个更高级的 CSS 布局来区分两部分，但最简单的是在同一行显示：*/
  /* 让 previous 和 symbol 靠左一些，current 靠右一些 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 靠下对齐 */
  align-items: flex-end;
}
.display > :first-child {
  font-size: 0.6em; /* 表达式部分小一点 */
  color: #a0a0a0; /* 表达式部分颜色淡一点 */
  height: 30px;
}

/* 按钮基础样式 */
.btn {
  background-color: #f0f0f0;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none; /* 防止选中文字 */
  transition: background-color 0.1s;
}

/* 按钮点击/悬停效果 */
.btn:hover {
  background-color: #dcdcdc;
}

/* 运算符按钮样式 */
.operator {
  background-color: #ff9500; /* 橙色 */
  color: white;
  font-weight: bold;
}

.operator:hover {
  background-color: #e08b00;
}

/* 零按钮样式 (占据两列) */
.zero {
  grid-column: 1 / 3;
}

/* 底部圆角 */
.zero {
  border-bottom-left-radius: 10px;
}

/* 等于号按钮 (右下角圆角) */
.calculator div:nth-last-child(1) { /* 最后一个按钮 */
  border-bottom-right-radius: 10px;
}

/* AC, +/-, % 按钮样式 (浅灰色) */
.calculator div:nth-child(2),
.calculator div:nth-child(3),
.calculator div:nth-child(4) {
  background-color: #d4d4d2;
  color: #000;
}

.calculator div:nth-child(2):hover,
.calculator div:nth-child(3):hover,
.calculator div:nth-child(4):hover {
  background-color: #c9c9c7;
}
</style>