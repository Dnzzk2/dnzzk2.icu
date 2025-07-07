---
title: 'Git常用命令及使用技巧'
description: '详细介绍 Git 常用命令及实用技巧，包括配置管理、提交撤销、分支操作等核心功能，帮助开发者提升 Git 使用效率并维护清晰的版本历史。'
pubDate: 2025-07-07
author: 'Dnzzk2'
recommend: false
tags: ['Git', 'Git技巧']
---

## 前言

Git 在工作中十分常用，善于使用 Git 技巧，可以在开发中提升效率，并且成就美观的 Git 记录。

本文收录一些 Git 常用命令及使用技巧，帮助快速上手 Git 及查阅，可以使用右上角的**搜索**功能快速查找，或者使用 `Ctrl + F` 快速查找。

## 设置全局配置

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

- 使用`--global`参数，设置全局配置，这样所有项目使用 Git 时，都会使用这个用户名、邮箱。
- 使用`--local`参数，设置当前项目配置，这样当前项目使用 Git 时，才会使用这个用户名、邮箱。

## 撤销最后一次提交（保留更改）

```bash
git reset --soft HEAD^
```

执行这个命令后：

1. 当前分支指针回退到上一个提交
2. 最后一次提交被"撤销"（但内容还在）
3. 所有修改内容都回到暂存区（Staged 状态）
4. 工作区文件保持不变

常用场景：

1. 修改最后一次提交信息：撤销后重新提交
2. 合并多个小提交：撤销几个提交，然后一次性提交
3. 重新组织提交内容：重新安排哪些文件在一个提交中

## 修改最后一次提交

```bash
git add .
git commit --amend -m "新的提交信息"
```

这会更新之前的提交，而不创建新的提交。

## 暂存未提交的更改

```bash
git stash

# 推荐：添加描述信息
git stash push -m "描述信息"
# 或者简写
git stash save "描述信息"
```

**查看 stash 列表：**

```bash
git stash list
```

**恢复指定的 stash：**

```bash
# 恢复最新的 stash
git stash pop

# 恢复指定的 stash（不删除）
git stash apply stash@{0}

# 恢复指定的 stash（并删除）
git stash pop stash@{0}
```

**删除 stash：**

```bash
# 删除指定 stash
git stash drop stash@{0}

# 清空所有 stash
git stash clear
```

## 以图形方式查看提交历史

```bash
git log --graph --oneline --all
```

## 通过变基保持提交历史整洁

变基（rebase）是一种 Git 的操作，它可以将多个提交历史合并为一个，并保持提交记录的整洁。

```bash
 # 将 'n' 替换为提交的数量
git rebase -i HEAD~n
```

**命令解释：**

- `git rebase`：变基操作，重新应用提交到新的基点上
- `-i`：交互式模式，打开编辑器让你手动选择如何处理每个提交
- `HEAD~3`：表示最近的3个提交

**执行后的操作选项：**

```text
pick a1b2c3d 第三个提交
pick e4f5g6h 第二个提交
pick i7j8k9l 第一个提交
```

**可选操作：**

- `pick`：保留这个提交
- `squash`：合并到上一个提交
- `edit`：暂停，允许修改这个提交
- `drop`：删除这个提交
- `reword`：修改提交信息

**常用场景：**

1. **合并多个小提交：**

```text
pick a1b2c3d 添加功能A
squash e4f5g6h 修复功能A的bug
squash i7j8k9l 完善功能A的样式
```

2. **修改提交信息：**

```text
reword a1b2c3d 添加功能A
pick e4f5g6h 其他提交
```

> [!note]**注意事项：**
>
> - 不要对已推送到远程的提交进行 rebase
> - 操作前建议先备份当前分支
> - 会改变提交历史，可能影响其他开发者

## 历史记录整洁且远程仓库同步

我们会遇到这样的需求：写好代码，并更新到远程仓库中，但是突然发现有一个地方错误，需要修改，我们又创建了一个提交，并更新到远程仓库，这样会出现两个提交，那么我们该如何使得他们成为一个提交呢？

**场景描述**

```bash
# 当前远程仓库状态：
基础提交 → 提交A → 修复A的bug
```

目标：将这两个提交合并为一个提交。

**方案一：Rebase + 强制推送（推荐）**

```bash
# 1. 交互式变基，合并最近的2个提交
git rebase -i HEAD~2

# 2. 在编辑器中设置：
pick a1b2c3d 提交A
squash b2c3d4e 修复A的bug

# 3. 编辑合并后的提交信息
# 保存后会要求编辑提交信息，可以改为：
# "提交A（包含bug修复）"

# 4. 强制推送到远程（覆盖远程历史）
git push --force-with-lease origin branch-name
```

**方案二：重置重新提交**

```bash
# 1. 重置到两个提交之前（保留所有更改）
git reset --soft HEAD~2

# 2. 重新提交所有更改为一个提交
git add .
git commit -m "提交A（包含bug修复）"

# 3. 强制推送
git push --force-with-lease origin branch-name
```

**方案三：Stash + Reset + Amend（最简单）**

```bash
# 1. 暂存最新提交的更改
git reset --soft HEAD~1
git stash

# 2. 回到第一个提交
git reset --soft HEAD~1

# 3. 恢复所有更改并修正提交
git stash pop
git add .
git commit --amend -m "提交A（包含bug修复）"

# 4. 强制推送
git push --force-with-lease origin branch-name
```

**方案四：创建新提交（最安全）**

如果不想改变已有历史，可以创建一个新的合并提交：

```bash
# 1. 重置到提交A之前（保留更改）
git reset --soft HEAD~2

# 2. 重新提交
git add .
git commit -m "提交A（完整版本）"

# 3. 推送新提交
git push origin branch-name
```

**最终效果对比**

**方案一、二、三的结果：**

```bash
基础提交 → 提交A（包含bug修复）
```

**远程只有1个新提交**

**方案四的结果：**

```bash
基础提交 → 提交A → 修复A的bug → 提交A（完整版本）
```

**远程有3个提交**

> [!note]**使用建议**
>
> **可以使用强制推送的情况：**
>
> - 个人分支或功能分支
> - 没有其他人基于这些提交工作
> - 还没有合并到主分支
>
> **应该使用方案四的情况：**
>
> - 主分支（master/main）
> - 已经被其他人拉取的提交
> - 团队共享的分支
>
> **安全提示：**
>
> - 使用 `--force-with-lease` 而不是 `--force`
> - 操作前确认没有其他人在相同分支上工作
> - 建议先备份当前分支：`git branch backup-branch`
>
> **重点：**
>
> - 方案一、方案二、方案三，都是修改本地分支的记录，最后使用`git push --force-with-lease origin branch-name`，强制推送，这是最关键的命令

## 列出所有分支（本地和远程）

```bash
git branch -a
```

## 清理未跟踪的文件和目录

```bash
# 建议先使用 --dry-run 查看会被清理的文件和目录
git clean -fd --dry-run
# 清理
git clean -fd
```

## 跟踪上游分支

让本地分支与远程分支保持同步。

```bash
git branch --set-upstream-to=origin/main
```

## 撤销已推送的提交

撤销特定提交的更改而不更改历史记录。

```bash
git revert <commit-id>
```

## 重置到指定提交

使用 `git reset --hard [commit-hash]` 可以将当前分支重置到指定的提交状态，丢弃所有后续的更改。注意，这将永久删除未保存的更改。

```bash
git reset --hard [commit-hash]
```

---

持续更新中...
