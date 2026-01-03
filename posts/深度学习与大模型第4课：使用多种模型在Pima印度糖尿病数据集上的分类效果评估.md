---
title: "深度学习与大模型第4课：使用多种模型在Pima印度糖尿病数据集上的分类效果评估"
date: Fri Jan 02 2026 23:58:48 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#深度学习","#分类","#人工智能"]
summary: ""
author: "xianyu120"
status: "Published"
---

#### 文章目录

  *     * 技术博客：使用多种模型在Pima印度糖尿病数据集上的分类效果评估
    *       * 数据集介绍
      * 数据预处理
      * 模型一：逻辑斯谛回归（Logistic Regression）
      * 模型二：支持向量机（SVM）
      * 模型三：决策树（Decision Tree）
      * 结果总结
      * 小结

### 技术博客：使用多种模型在Pima印度糖尿病数据集上的分类效果评估

在机器学习中，选择适合的数据处理和模型是影响结果的重要因素。本文以Pima印度糖尿病数据集为例，通过逻辑斯谛回归（Logistic
Regression）、支持向量机（SVM）、以及决策树（Decision
Tree）三个模型，对数据进行分类，并通过网格搜索（GridSearchCV）优化模型参数，评估每个模型的表现。

#### 数据集介绍

**Pima Indians Diabetes 数据集**
包含了768名女性患者的医疗记录，每条记录包含8个特征，包括怀孕次数、血糖、血压等，目标值为是否患有糖尿病（Outcome: 0 或 1）。

#### 数据预处理

首先，我们使用`pandas`读取数据，并使用自定义的`ProcessData`类进行数据划分与标准化：

    
    
    class ProcessData(TransformerMixin):
        def __init__(self, label, shuffle=False):
            self.label = label
            self.shuffle = shuffle
    
        def transform(self, X, y=None):
            y_data = X[self.label]
            X_data = X.drop(self.label, axis=1)
            if self.shuffle:
                X_train, X_test, y_train, y_test = train_test_split(
                    X_data, y_data, test_size=0.2, shuffle=True, stratify=y_data, random_state=42)
            else:
                X_train, X_test, y_train, y_test = train_test_split(
                    X_data, y_data, test_size=0.2, random_state=42)
    
            stdScaler = StandardScaler().fit(X_train)
            return stdScaler.transform(X_train), y_train, stdScaler.transform(X_test), y_test
    
    proData = ProcessData(label='Outcome', shuffle=True)
    X_train, y_train, X_test, y_test = proData.fit_transform(df)
    

我们将数据集划分为训练集和测试集，并对特征进行了标准化处理。

#### 模型一：逻辑斯谛回归（Logistic Regression）

逻辑斯谛回归是一种广泛使用的线性分类算法。我们首先通过交叉验证（cross-validation）评估原始模型的表现，接着通过网格搜索优化模型的超参数。

    
    
    lr_model = LogisticRegression()
    cv_score = cross_val_score(lr_model, X_train, y_train, scoring='f1', cv=10)
    print('cross validation score of raw model {}'.format(cv_score))
    
    # 网格搜索
    c_range=[0.001, 0.01, 0.1, 1.0]
    solvers = ['liblinear', 'lbfgs', 'newton-cg', 'sag']
    max_iters=[80, 100, 150, 200, 300]
    tuned_parameters= dict(solver=solvers, C=c_range, max_iter=max_iters)
    grid= GridSearchCV(lr_model, tuned_parameters, cv=10, scoring='f1')
    grid.fit(X_train,y_train)
    

**结果** ：

  * 最优参数：`{'C': 0.001, 'max_iter': 80, 'solver': 'liblinear'}`
  * 训练集 F1 分数：`0.6587`
  * 测试集 F1 分数：`0.5656`

#### 模型二：支持向量机（SVM）

SVM是一种强大的分类算法，适用于线性和非线性数据。我们采用线性核函数并使用网格搜索优化正则化参数C和核函数参数gamma。

    
    
    svc_model = SVC()
    c_range = [0.001, 0.01, 0.1, 1.0, 10, 100]
    kernels = ['linear', 'rbf', 'poly']
    gamma_range = ['scale', 'auto']
    tuned_parameters = dict(C=c_range, kernel=kernels, gamma=gamma_range)
    grid = GridSearchCV(svc_model, tuned_parameters, cv=10, scoring='f1')
    grid.fit(X_train, y_train)
    

**结果** ：

  * 最优参数：`{'C': 1.0, 'gamma': 'scale', 'kernel': 'linear'}`
  * 训练集 F1 分数：`0.6632`
  * 测试集 F1 分数：`0.5656`

#### 模型三：决策树（Decision Tree）

决策树是一种非参数分类模型，适合处理较为复杂的数据。我们通过网格搜索优化其分割准则、深度和叶子节点的最小样本数等参数。

    
    
    dt_model = DecisionTreeClassifier()
    criterion = ['gini', 'entropy']
    splitter = ['best', 'random']
    max_depth = [None, 10, 20, 30, 50]
    min_samples_split = [2, 10, 20]
    min_samples_leaf = [1, 5, 10]
    tuned_parameters = dict(criterion=criterion, splitter=splitter, max_depth=max_depth, 
                            min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf)
    grid = GridSearchCV(dt_model, tuned_parameters, cv=10, scoring='f1')
    grid.fit(X_train, y_train)
    

**结果** ：

  * 最优参数：`{'criterion': 'gini', 'max_depth': 10, 'min_samples_leaf': 10, 'min_samples_split': 2, 'splitter': 'random'}`
  * 训练集 F1 分数：`0.6702`
  * 测试集 F1 分数：`0.5053`

#### 结果总结

  * **逻辑斯谛回归** ：表现均衡，测试集F1分数略高于其他模型，适合应用于特征较为线性的任务。
  * **支持向量机** ：尽管在训练集上表现良好，但在测试集上泛化能力有所欠缺。
  * **决策树** ：对于非线性数据，决策树在训练集表现出色，但在测试集上的表现略逊。

通过比较可得出，在Pima印度糖尿病数据集上，逻辑斯谛回归模型经过优化后具有较为优越的泛化能力，而SVM和决策树模型在训练时虽然表现优秀，但在测试集上的表现一般，可能存在过拟合的现象。

#### 小结

本次分析展示了如何使用网格搜索优化机器学习模型的超参数，并结合交叉验证（cross-
validation）和F1分数进行评估。在实际应用中，选择合适的模型及其参数是至关重要的，只有经过充分调优才能获得最佳效果。

