---
title: "✨【Java基础】每天一道基础题+面试题——Day01✨"
date: "2026-01-02T15:45:24.262356"
category: "SQL练习"
tags: ["#java"]
summary: "Java基础练习：包含古典兔子问题等经典算法题目和面试题。"
author: "xianyu120"
status: "Published"
---

> 今天是持续学习的第 `29 / 100` 天。 如果你有想要交流的想法、技术，欢迎在评论区留言。

### 🚩一道笔试题

題目：古典问题：有一对兔子，从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子总数为多少？  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/58d9d31ef5ac4a90a5144bd4cef62e72.png)

    
    
    public static void main(String[] args) {
            //需要输入的月份:
            System.out.println("请输入的月份");
            Scanner sc = new Scanner(System.in);
            int i = sc.nextInt();
            int[] arr = new int[i];
            //定义1和2月都只有1对兔子
            arr[0] =arr[1] =1;
            //定义初始月份
            int j =0;
            //try catch 增加稳定性
            try {
                //不确定月份所以弄成while循环
                while (true){
                    //前2月
                    if (j<2){
                        System.out.println("第"+(j+1)+"个月后有"+arr[j]+"对兔子.");
                        //之后
                    } else if (j>=2){
                        arr[j]=arr[j-1]+arr[j-2];
    
                        System.out.println("第"+(j+1)+"个月后有"+arr[j]+"对兔子.");
                    }
                    j++;
                }
            } catch (Exception e) {
                System.err.println("到头辣!!");
            }
        }
    

代码均写有注释了  
以上是我的解法  
应该还有更优的解法  
甚至为了表示999个月,我想到用BigInteger,  
具体参考:  
<https://blog.csdn.net/guomutian911/article/details/45030121>

等半年后再回来重做一遍,  
看看这梦开始的地方

参考解法:

    
    
    public class Rubbit {
    
    	public static void main(String[] args) {
    
    	Scanner sc = new Scanner(System.in);
    	System.out.print("请输入月份");
    	int n = sc.nextInt();
    	System.out.println("在"+n+"月份有"+fun(n)+"对兔子");
    	}
    	private static int fun(int n) {
    		if (n == 1 || n == 2)     //  表示第1月，第2月的对数
    			return 1;
    		else
    			return fun(n - 1) + fun(n - 2);  // 3月之后该怎么算
    	}
    
    }
    

### 🚩一道面试题

2、访问修饰符public，private，protected，以及不写时的区别？

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bd8d3616337b4a7b0446b8612079dbad.png)  
原文链接:https://blog.csdn.net/v123411739/article/details/115364158  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/84aa681ee5e7230b23557db79fd8c73c.png)

