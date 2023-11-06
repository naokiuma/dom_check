import { Counter } from '../app/features/counter';
import { Container, Select } from '@mantine/core';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';

interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

const Popup = (): ReactElement => {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    async () => {
      const value = await bucket.get();
      if (value.targetLang) {
        setLang(value.targetLang);
      }
    };
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
      <h1>Popup</h1>

      <p>どの言語に翻訳しますか？</p>

      <select name="target_lang" value={lang} onChange={(event) => saveLang(event.target.value)}>
        <option value="EN">英語</option>
        <option value="KO">韓国語</option>
        <option value="ZH">中国語</option>
        <option value="JA">日本語</option>
      </select>
      {/* <Select

				label="どの言語に翻訳しますか？"
				value={lang}
				// onChange={(value: string) => saveLang(value)}
				data={[
					{ value: 'EN', label: '英語' },
					{ value: 'KO', label: '韓国語' },
					{ value: 'ZH', label: '中国語' },
					{ value: 'JA', label: '日本語' },
				]}

				/> */}
    </div>
  );
};

export default Popup;
