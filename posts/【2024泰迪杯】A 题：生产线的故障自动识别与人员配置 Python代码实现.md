---
title: "【2024泰迪杯】A 题：生产线的故障自动识别与人员配置 Python代码实现"
date: Fri Jan 02 2026 23:59:55 GMT+0800 (China Standard Time)
category: "技术分享"
tags: ["#python","#数学建模","#开发语言"]
summary: ""
author: "xianyu120"
status: "Published"
---

更新时间：2024-4-6

###
【2024[泰迪杯](https://so.csdn.net/so/search?q=%E6%B3%B0%E8%BF%AA%E6%9D%AF&spm=1001.2101.3001.7020)】A
题：生产线的故障自动识别与人员配置 Python代码实现

### 数学建模助手使用

<https://chatgpt-plus.top/g/g-fwQfcaTKA-shu-xue-jian-mo-bi-sai-bian-cheng-zhu-
shou>

### 1 问题

一、问题背景

随着新兴信息技术的大规模应用，工业生产线的[智能化控制](https://so.csdn.net/so/search?q=%E6%99%BA%E8%83%BD%E5%8C%96%E6%8E%A7%E5%88%B6&spm=1001.2101.3001.7020)技术日益成熟。自动生产线

可以自动完成物品传送、物料填装、产品包装和质量检测等过程，极大地提高了生产效率和产品质量，减少了生产成本。自动生产线融入故障智能报警技术，能避免因故障带来的生产中断和经济损失；同时合理的人员配置，能够减少资源浪费、提高生产效率。

二、解决问题

问题 1： 根据附件 1 中的数据，分析生产线中各装置故障的数据特征，构建故障报警模型，实现故障的自动即时报警。

问题 2： 应用问题 1 所建立的模型，对附件 2
中的数据进行分析判断，实现生产线中各装置故障的自动即时报警，给出故障报警的日期、开始时间与持续时长，将结果存放到result2.xlsx 中（格式见表
1，模板文件在附件 2 中），并在论文中给出每条生产线中各装置每月的故障总次数及最长与最短的持续时长。

表 1 result2.xlsx 的格式

故障编号| 1001| 2001| …| 6002| | | | | |   
---|---|---|---|---|---|---|---|---|---|---  
序号| 日期| 开始时间| 持续时长/秒| 日期| 开始时间| 持续时长/秒| …| 日期| 开始时间| 持续时长/秒  
1| 3| 579| 67| 1| 4792| 98| …| 1| 2047| 51  
2| 4| 1648| 101| 1| 18379| 72| …| 2| 9482| 48  
3| 7| 20947| 96| 3| 1971| 122| …| 3| 1903| 58  
…| …| …| …| …| …| …| …| …| …| …  
  
问题 3 ： 根据附件 3 中的数据，分析产品的产量、合格率与生产线、操作人员等因素的关系。

问题 4： 根据实际情况，现需要扩大生产规模，将生产线每天的运行时间从 8 小时增加到 24 小时不间断生产。针对问题 3 的 10 条生产线，结合问题 3
的分析结果，考虑生产线与操作人员的搭配，制定最佳的操作人员排班方案，将结果存放到 result4-1.xlsx 和result4-2.xlsx 中（格式见表
2 和表 3，模板文件在附件 4 中），并在论文中给出最佳的排班方案及相关结果。

要求排班满足如下条件：

(1) 各操作人员做五休二，尽量连休 2 天；

(2) 各操作人员每班连续工作 8 小时；

(3) 班次时间：早班（8:00-16:00）、中班（16:00-24:00）、晚班（0:00-8:00）；

(4) 各工龄操作人员的人数比例与问题 3 中的比例相同；各操作人员的班次安排尽量均衡。

### 2 问题分析

#### 2.1 问题一

（1）分析故障数据特征，包括故障发生的时间分布、故障发生的频率、故障类型的分布等。

（2）构建故障报警模型，是多标签的分类问题，或者是针对每个故障编码建模，就是一个分类问题。分类算法包括决策树、随机森林、支持向量机、逻辑回归和神经网络等。也可以建立成一个时间序列问题，注意数据集给的日期和时间，格式不是标准的datetime格式，是1、2、3、4这样的格式。需要转换为datetime再去建模。

#### 2.2 问题二

（1）故障识别

  * 如果建立成一个分类问题，针对每个生产线、每个故障编码的序列，分别训练一个分类模型。
  * 如果建立时间序列回归问题，可以采用ARIMA、LSTM等构建模型进行故障预测。

题目要求以附件一的数据作为训练集，预测附件2，然后生成result2.xlsx文件。但是目前还没有提供附件二的数据，就可以以附件一为训练集和测试集。跑通baseline模型。

（2）故障时长计算

  * 单次故障，不连续，持续时间为1
  * 连续两次故障，持续时间为2
  * 连续多次故障，持续时间为，开始时刻和结束时刻之间的时间差加1。

（3）每条生产线中各装置的每月统计数据

注意需要计算每个生产线的每个月统计数据，则需要使用分组操作来分析每条生产线中各装置的每月统计数据（故障次数、最长持续时长和最短持续时长）。

（4）输出结果

将每种类型的故障分析结果，横向排列，纵向是按故障发生的顺序排列，整理为dataframe格式，输出到result2.xlsx中。

#### 2.3 问题三

（1） 产量分析

使用时间序列分析方法（如ARIMA模型）来预测产量随时间的变化趋势。

回归分析来探索产量与其他因素（如生产线编号、推送状态、装置故障等）的关系。

（2）合格率分析

逻辑回归分析来探索合格率与其他因素之间的关系；

使用决策树或随机森林等分类算法，寻找影响合格率的关键因素

（3） 故障分析

关联规则挖掘算法查找故障与其他因素（如操作人员、生产线编号）之间的关联性。

#### 2.4 问题四

（1）在问题三的基础上，计算出每个生产线的生产效率和合格率，找出与操作人员、班次等因素的关系；

（2）根据生产效率和合格率的关系，制定最佳的操作人员排班方案；制定最佳的操作人员排班方案涉及到多个因素，包括但不限于：工作时间要求、人员能力匹配、轮班规则、休息时间安排、法定假期等。

（3）根据实际数据进行生产效率和合格率的计算，然后根据操作人员的工作时间和班次对其进行排班。这可能涉及到安排不同技能水平的操作人员，以确保生产线能够在高效率和高合格率下运行。实时调整排班计划，随着生产线的运行，实时监控生产效率和合格率的变化，及时调整操作人员的排班计划以适应变化的生产需求。结合其他因素进行综合考虑，如在排班计划中、操作人员的休息时间、加班安排、交接班等，以确保生产线的持续稳定运行。

### 3 Python代码实现

#### 3.1 问题一

    
    
    import pandas as pd
    import matplotlib.pyplot as plt
    import warnings
    import seaborn as sns
    warnings.filterwarnings('ignore')
    plt.rcParams['font.sans-serif'] = 'SimSun' # 换成自己环境下的中文字体，比如'SimHei'
    
    df = pd.read_csv('A题-示例数据/附件1/M101.csv')
    
    # 查看数据前几行
    print(df.head())
    
    # 故障数据分析
    fault_columns = [col for col in df.columns if '故障' in col]
    fault_counts = df[fault_columns].sum()
    print(fault_counts)
    
    # 可视化故障数据
    plt.figure(figsize=(10, 6))
    colors = sns.color_palette("hls", len(fault_counts))
    
    fault_counts.plot(kind='bar', color=colors)
    plt.title('Device Fault Counts')
    plt.xlabel('Device')
    plt.ylabel('Fault Count')
    plt.savefig('img/1.png',dpi=100)
    plt.show()
    
    1234567891011121314151617181920212223242526272829
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/792f74bf3f18bc8d5ae7a1295802cac6.png#pic_center)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/668fa9e1e1f70099d10e851b881c045f.png#pic_center)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f5421fe926061c588ca137bdb4ebbef2.png#pic_center)

    
    
    # 生产线编号分析
    line_counts = df['生产线编号'].value_counts()
    print(line_counts)
    
    # 可视化生产线编号分布
    plt.figure(figsize=(10, 6))
    colors = sns.color_palette("hls", len(line_counts))
    line_counts.plot(kind='bar',color = colors)
    plt.title('Production Line Distribution')
    plt.xlabel('Production Line Number')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('img/2.png',dpi=100)
    plt.show()
    1234567891011121314
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7b0addaae92393e9d7051826565131f4.png#pic_center)

    
    
    import matplotlib.pyplot as plt
    import warnings
    import seaborn as sns
    warnings.filterwarnings('ignore')
    
    df = pd.read_csv('A题-示例数据/附件1/M101.csv')
    # 物料推送气缸状态分析
    push_counts = df['物料推送气缸推送状态'].value_counts()
    pull_counts = df['物料推送气缸收回状态'].value_counts()
    push_pull_counts = pd.DataFrame({'Push': push_counts, 'Pull': pull_counts})
    print(push_pull_counts)
    
    plt.figure(figsize=(10, 6))
    # 可视化物料推送气缸状态
    colors = sns.color_palette("hls", len(push_pull_counts))
    
    push_pull_counts.plot(kind='bar', stacked=True,color = colors)
    plt.title('Material Push Cylinder State')
    plt.xlabel('State')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('img/3.png',dpi=100)
    
    plt.show()
    123456789101112131415161718192021222324
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2e04cb2738c5db2c9849534d82e59f85.png#pic_center)

    
    
    import pandas as pd
    import matplotlib.pyplot as plt
    import seaborn as sns
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import confusion_matrix, classification_report
    
    # 统计各装置故障的情况
    fault_columns = ['物料推送装置故障1001', '物料检测装置故障2001', '填装装置检测故障4001', '填装装置定位故障4002',
                     '填装装置填装故障4003', '加盖装置定位故障5001', '加盖装置加盖故障5002',
                     '拧盖装置定位故障6001', '拧盖装置拧盖故障6002']
    # 加载数据
    data = pd.read_csv('A题-示例数据/附件1/M101.csv')
    #  构建故障报警模型
    # 首先，选取特征和目标变量
    feature_columns = ['时间', '物料推送气缸推送状态', '物料推送气缸收回状态', '物料推送数', '物料待抓取数',
                       '填装数', '加盖数', '拧盖数', '合格数', '不合格数']
    target_columns = fault_columns
    
    data_len = 10000
    X = data[feature_columns][0:data_len]
    # 多标签问题
    y = data[target_columns][0:data_len]
    
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 使用随机森林模型进行训练
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    
    # 在测试集上进行预测
    y_pred = model.predict(X_test)
    
    # 评估模型性能
    print('混淆矩阵：')
    print(confusion_matrix(y_test.values.flatten(), y_pred.flatten()))
    print('\n分类报告：')
    print(classification_report(y_test.values.flatten(), y_pred.flatten()))
    
    1234567891011121314151617181920212223242526272829303132333435363738394041
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ef1fd5cfab083381706a444999c3ed25.png#pic_center)

#### 3.2 问题二

    
    
    import pandas as pd
    import numpy as np
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score
    from datetime import datetime
    from collections import defaultdict
    
    # 读取数据
    data = pd.read_csv('A题-示例数据/附件1/M101.csv')
    
    # 定义故障字段
    fault_columns = ['物料推送装置故障1001', '物料检测装置故障2001', 
                     '填装装置检测故障4001', '填装装置定位故障4002', '填装装置填装故障4003', 
                     '加盖装置定位故障5001', '加盖装置加盖故障5002', 
                     '拧盖装置定位故障6001', '拧盖装置拧盖故障6002']
    data.replace({1001: 1, 2001: 1, 4001: 1, 4002: 1, 4003: 1, 5001: 1, 5002: 1, 6001: 1, 6002: 1}, inplace=True)
    # 故障报警日期、开始时间与持续时长
    fault_info = defaultdict(list)
    # line_number = data.groupby(['生产线编号'])
    for line_number,line_data in data.groupby(['生产线编号']):
        for label in fault_columns:
            # 训练数据集长度
            data_length = 10000 #只取部分数据，用于跑通baseline，应该为len(line_data)
            # 构建故障预警模型
            X = line_data[line_data.columns.difference(['日期', '时间','生产线编号'])][0:data_length]
            y = line_data[label][0:data_length]
            # 80%用于训练，20%用于测试
            # train_len = int(0.8*len(X))
            # X_train, X_test, y_train, y_test = X[0:train_len],X[train_len:],y[0:train_len],y[train_len:]
            # 假设100%用于训练，100%用于测试
            X_train, X_test, y_train, y_test = X,X,y,y
    
            print(f'生产线编号:{line_number},故障编码:{label},训练集样本数:{len(X_train)}，测试集样本数:{len(X_test)}')
        
            。。。略，请下载完整资料
            acc = accuracy_score(y_test, y_pred)
            print("模型准确率：", acc)
            # 预测故障报警,假设全部数据集为附件2数据
            file2_df = line_data[line_data.columns.difference(['日期', '时间','生产线编号'])]
            predictions = rf.predict(file2_df)
            # 用生产线编号和故障编号，组成唯一的键，来唯一表示某个生产线上的特定故障数据
            key = (line_number,label)
    
            # 统计故障发生的日期、开始时间、持续时长
            for i in range(len(predictions) - 1):
                if predictions[i] == 1 and predictions[i+1] == 0:
                    # 只发生一次，持续时长为1
                    ...略
                    fault_info[key].append((happend_date,happend_time,happend_duration))
                if predictions[i] == 1 and predictions[i+1] == 1:
                    if len(fault_info[key])==0:
                        # 连续两次发生，持续时长为2
                        ...略
                        fault_info[key].append((happend_date,happend_time,happend_duration))
                    else:  
                        # 连续多次发生，持续时长为，当前时间-上一次发生时间
                        ...略
                        fault_info[key][-1] = ((happend_date,happend_time,happend_duration))
    fault_info
    
    1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e0b5e39621f0fb8fd82c5033b50dbfb9.png#pic_center)

    
    
    # 将每条生产线，故障发生的日期、开始时间、持续时长数据，转为result2.xlsx格式
    fault_info_new = defaultdict(list)
    for key in fault_info.keys():
        if len(fault_info_new[key[1]])==0:
            fault_info_new[key[1]] = fault_info[key]
        else:
            fault_info_new[key[1]] += fault_info[key]
    print(fault_info_new)
    12345678
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6d74e1412acb0d060d557e332f107714.png#pic_center)

    
    
    result_df_list = []
    for df_cols in fault_info_new.keys():
        print(df_cols)
        # 将特定故障编号的数据，保存为单个表格
        temp_error_df = pd.DataFrame(fault_info_new[df_cols],columns=['日期', '开始时间', '持续时长/秒'])
        result_df_list.append(temp_error_df)
    # 横向合并所有故障编号的数据
        
    result2_df = pd.concat(result_df_list,axis=1)
    
    result2_df.loc[-1] = [x for x in fault_info_new.keys() for _ in range(3)] # 添加故障编码到首行
    result2_df.index = result2_df.index + 1  # 将索引整体后移
    result2_df = result2_df.sort_index()  # 重新按索引排序
    
    result2_df.to_excel('./提交数据/result2.xlsx',index=False)
    print(result2_df)
    12345678910111213141516
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9ae4aa090a4018affdff671653bd9d82.png#pic_center)

    
    
    # 统计每条生产线的数据，故障发生的日期、开始时间、持续时长数据
    fault_info_new = defaultdict(list)
    for key in fault_info.keys():
        if len(fault_info_new[key[0]])==0:
            fault_info_new[key[0]] = fault_info[key]
        else:
            fault_info_new[key[0]] += fault_info[key]
    print(fault_info_new)
    12345678
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/722c4531f5409b62366bfb44d17e476a.png#pic_center)

    
    
    for line_n in fault_info_new.keys():
        line_fault_info = fault_info_new[line_n]
        third_elements = [x[2] for x in line_fault_info]
        monthly_fault = sum(third_elements)
        max_duration = max(third_elements)
        min_duration = min(third_elements)
        print(f"生产线:{line_n},每月故障总次数:{monthly_fault},最长时间:{max_duration},最短时间:{min_duration}")
    1234567
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/29600914a83cba520c2c82d3dce9e20e.png#pic_center)

#### 3.3 问题三

#### 3.3 问题三

分析产品的产量、合格率与生产线、操作人员等因素的关系。从以下三个角度去分析

  1. 使用时间序列分析方法（ARIMA模型）来预测产量随时间的变化趋势

  2. 线性回归分析产量与其他因素的关系，拟合效果好，说明成线性关系，此外还可以通过XGB模型拟合方法，并可视化每种特征的重要性

  3. 关联规则挖掘算法查找故障与其他因素之间的关联性，说明故障的原因，根据此结论，给出提高产量的具体方案

（1）数据预处理

    
    
    import pandas as pd
    import numpy as np
    from statsmodels.tsa.arima.model import ARIMA
    from sklearn.linear_model import LinearRegression
    from sklearn.model_selection import train_test_split
    from mlxtend.frequent_patterns import apriori
    import matplotlib.pyplot as plt
    from sklearn.metrics import mean_squared_error
    import warnings
    warnings.filterwarnings('ignore')
    plt.rcParams['font.sans-serif'] = ['FangSong']
    
    
    df = pd.read_csv('A题-示例数据/附件3/M301.csv')
    
    # 将日期和时间转换为一个连续的时间戳字段
    df['日期'] = df['日期'].astype(int)  # 确保日期是整数类型
    df['时间'] = df['时间'].astype(int)  # 确保时间是整数类型
    df['时间戳'] = (df['日期'] - 1) * 86400 + df['时间']  # 将日期和时间转换为从0开始的累积秒数
    
    # 将生产线编号转换为分类变量
    df['生产线编号'] = df['生产线编号'].astype('category')
    
    # 将故障状态转换为二进制变量
    binary_fault_columns = [
        '物料推送装置故障1001', '物料检测装置故障2001',
        '填装装置检测故障4001', '填装装置定位故障4002',
        '填装装置填装故障4003', '加盖装置定位故障5001',
        '加盖装置加盖故障5002', '拧盖装置定位故障6001',
        '拧盖装置拧盖故障6002'
    ]
    for col in binary_fault_columns:
        df[col] = df[col].apply(lambda x: 1 if x else 0)
    df[binary_fault_columns]
    12345678910111213141516171819202122232425262728293031323334
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d17e421c249298618ec25141d69fd3ea.png#pic_center)

    
    
    # 计算产量和合格率
    # 假设每个物料推送动作代表一个单位的产量，填装数、加盖数和拧盖数分别代表该工序的产量
    df['产量'] = df['物料推送数'] + df['填装数'] + df['加盖数'] + df['拧盖数']
    df['合格率'] = df['合格数'] / (df['合格数'] + df['不合格数'])
    1234
    

（2）时间序列分析

    
    
    ...略
    plt.plot(range(len(sorted_data)), sorted_data['产量'], label='Observed')
    plt.plot(results.fittedvalues.index, results.fittedvalues, label='Fitted', linestyle='--')
    plt.legend()
    plt.savefig('img/问题三/ARIMA.png',dpi=100)
    plt.show()
    123456
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a469cbeef25b3df6bad30e676585b2be.png#pic_center)

（3）回归预测分析

    
    
    ...略
    from sklearn.metrics import r2_score,mean_squared_error
    import statsmodels.api as sm
    # 模型拟合
    y_pred = linear_reg.predict(X_train)
    
    # 计算R平方值
    r_squared = r2_score(y_train,y_pred)
    
    # 计算均方误差
    mse = mean_squared_error(y_train,y_pred)
    
    # 构建模型摘要
    X_train = sm.add_constant(X_train)  # 添加常数列
    model = sm.OLS(y_train,X_train).fit()
    
    # 打印回归分析报告
    print(model.summary())
    123456789101112131415161718
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ebd72d5aef1bef7a234312fac4480bc9.png#pic_center)

（4）特征重要性分析

    
    
    ...略
    plt.rcParams['font.sans-serif'] = ['FangSong']
    
    # 特征重要性
    feature_importances = xgb_regressor.feature_importances_
    
    # 可视化特征重要性
    sorted_indices = feature_importances.argsort()
    sorted_features = X.columns[sorted_indices]
    sorted_importances = feature_importances[sorted_indices]
    
    # 创建画布并设置尺寸
    plt.figure(figsize=(10,len(sorted_features) * 0.5)) # 增加高度以拉开条形图的间距
    
    # 绘制条形图，通过设置dodge参数为True来增加柱状图间距
    ax = sns.barplot(x=sorted_importances,y=sorted_features,dodge=True)
    
    # 设置标题和坐标轴标签
    plt.title('特征重要性',fontsize=18)
    plt.xlabel('特征重要性分数',fontsize=14)
    plt.ylabel('特征',fontsize=14)
    
    # 通过调整标签位置来确保y轴标签准确对齐于每个条形图的中间
    ax.set_yticklabels(ax.get_yticklabels(),va='center')
    plt.savefig('img/问题三/特征重要性.png',dpi=100)
    # 显示图形
    plt.show()
    123456789101112131415161718192021222324252627
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7ee1463bd828a7ed0897d0a28f1cae45.png#pic_center)

（5）关联规则分析

    
    
    # 故障分析
    colors = sns.color_palette("Set1",n_colors=9)
    # 遍历每一行绘制柱状图
    for i in range(len(fault_counts_df)):
       plt.bar(fault_counts_df.columns[1:],fault_counts_df.iloc[i,1:],color=colors)
       plt.title(f'生产线{fault_counts_df.index[0]}的错误数')
       plt.xlabel('错误类型')
       plt.ylabel('数量')
       plt.xticks(rotation=45)
       plt.savefig(f'img/问题三/生产线{fault_counts_df.index[0]}的错误统计.png',dpi=100)
       plt.show()
    1234567891011
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8fcb352c5f3062c09dbc766dcec1eef7.png#pic_center)

    
    
    # 使用apriori函数找到频繁项集
    frequent_itemsets = apriori(df_encoded, min_support=0.01, use_colnames=True)
    
    # 根据频繁项集找到关联规则
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)
    
    # 打印关联规则
    print(rules[['antecedents', 'consequents', 'support', 'confidence']])
    12345678
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e049be87217d8efa22cfb21df6ccd01e.png#pic_center)

