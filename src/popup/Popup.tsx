import { Counter } from '../app/features/counter';
import { Container, Select } from '@mantine/core';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';

interface MyBucket {
  targetLang: string;
}
const bucket = getBucket<MyBucket>('my_bucket', 'sync');

const Popup = (): ReactElement => {
  document.body.style.width = '20rem';
  document.body.style.height = '20rem';
  const [lang, setLang] = useState('tom');
  const [test, setTest] = useState('');

  //ある or ない
  const [is_exist, setIsExist] = useState(false);

  //targetのdomを全てセットする配列
  const [target_dom, setTargetDom] = useState(['']);

  //条件をセット
  const [check_info, setCheckInfo] = useState();

  //imgを選んだ場合
  //全てのimgタグを取得

  // const title = document.getElementById("pageTitle");
  // const url = document.getElementById("pageURL");

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs[0].title != undefined) {
      setTest(tabs[0].title);
      const imgElems = document.images;

      for (let i = 0, len = imgElems.length; i < len; i++) {
        // console.log(imgElems[i].src);
        imgElems[i].style.border = '1px solid red';
      }
    }
  });

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.targetLang) {
        setLang(value.targetLang);
      }
    })();
  }, []);

  const saveLang = (lang: string) => {
    bucket.set({ targetLang: lang });
    setLang(lang);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    saveLang(event.target.value);
    // console.log(event.target)
  };

  return (
    <div>
      <h1>Domチェック</h1>
      ページのタイトルを取得
      {test}
      <p>検索するタグを選んでください</p>
      <span>{lang}</span>
      {/* <select name="target_lang" value={lang} onChange={(event) => saveLang(event.target.value)}>
        <option value="EN">英語</option>
        <option value="KO">韓国語</option>
        <option value="ZH">中国語</option>
        <option value="JA">日本語</option>
      </select> */}
      <select name="tag_type" value={lang} onChange={(event) => saveLang(event.target.value)}>
        <option value="EN">英語</option>
        <option value="KO">韓国語</option>
        <option value="ZH">中国語</option>
        <option value="JA">日本語</option>
      </select>
    </div>
  );
};

export default Popup;
