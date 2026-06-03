---

title: "마크다운 사용법입니다"

description: "블로그 첫 글로 마크다운 사용법을 알아보아요."

category: "개발"

date: "2026-05-30"

thumbnail: "/images/post-1thumb.png"

---

chatGPT를 통해 제작한 블로그입니다.

마크다운 사용법은 해당 링크를 통해 가져왔습니다.

[gist.github](https://gist.github.com/ihoneymon/652be052a0727ad59601)


# 1. 마크다운 사용법

## 1.1 Headers

"#"

# 이건 H1이에요

## 이건 H2이에요

### 이건 H3이에요

#### 이건 H4이에요

##### 이건 H5이에요

###### 이건 H6이에요



## 1.2 BlockQuote

">"

> 첫번째 블럭
>> 두번째 블럭
>>> 세번째 블럭

## 1.3 List

### ol

"1, 2, 3"

1. 첫번째
2. 두번째
3. 세번째

### ul

"*, -, +"

* 빨강
- 녹색
+ 파랑

## 1.4 code

### 1.4.1 들여쓰기

```
This is a normal paragraph:

    This is a code block.

end code block.
```

This is a normal paragraph:

    This is a code block.

end code block.

### 1.4.2 코드블럭

- ("```") 이용
```python
print("Hello World!")
```

## 1.5 수평선 <hr/>

```
* * *

***

*****

- - -

----------------------
```

* * *

***

*****

- - -

----------------------

## 1.6 링크

- 외부링크

```
[Google](https://google.com, "google link")
```

[Google](https://google.com, "google link")


- 자동연결

```
* 외부링크: <http://example.com>
* 이메일링크: <address@example.com>
```

* 외부링크: <http://example.com>
* 이메일링크: <address@example.com>

## 1.7 강조

```
*single asterisks*
_single underscores_
**double asterisks**
__double underscores__
~~cancelline~~
```

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

~~cancelline~~

## 1.8 이미지
![Alt text](/images/alter.png)
