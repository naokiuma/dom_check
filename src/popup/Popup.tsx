import { Counter } from '../app/features/counter';
import { Container, Select } from '@mantine/core';

const Popup = () => {
  return (
    <div>
      <h1>Popup</h1>

      <p>どの言語に翻訳しますか？</p>

      <select name="target_lang">
        <option value="EN">英語</option>
        <option value="KO">韓国語</option>
        <option value="ZH">中国語</option>
        <option value="JA">日本語</option>
      </select>
    </div>
  );
};

export default Popup;
