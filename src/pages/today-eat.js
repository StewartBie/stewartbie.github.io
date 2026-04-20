import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import styles from './today-eat.module.css';

const HOME_FOODS = ['圆寂云饺', 'M', '西安面', '明厨', '永记川菜', '四川凉菜', '小吃街', '外卖'];
const OUTDOOR_FOODS = ['齐齐哈尔烤肉', '盛香亭', '小湖北', '萨利亚',  '江西菜', '巴蜀熊猫', '烤鱼'];
const COLORS = ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#4DABF7', '#9775FA', '#F06595', '#20C997'];

function getGradient(items) {
  const slice = 360 / items.length;
  const sections = items.map((_, i) => {
    const start = i * slice;
    const end = (i + 1) * slice;
    const color = COLORS[i % COLORS.length];
    return `${color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${sections.join(',')})`;
}

function buildLabels(items) {
  const slice = 360 / items.length;
  return items.map((item, i) => {
    const angle = (i + 0.5) * slice;
    const rad = (angle * Math.PI) / 180;
    const radius = 38;
    return {
      item,
      left: `${50 + radius * Math.sin(rad)}%`,
      top: `${50 - radius * Math.cos(rad)}%`,
    };
  });
}

export default function TodayEatPage() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [result, setResult] = useState('');
  const items = isOutdoor ? OUTDOOR_FOODS : HOME_FOODS;

  const homeGradient = useMemo(() => getGradient(HOME_FOODS), []);
  const outdoorGradient = useMemo(() => getGradient(OUTDOOR_FOODS), []);
  const homeLabels = useMemo(() => buildLabels(HOME_FOODS), []);
  const outdoorLabels = useMemo(() => buildLabels(OUTDOOR_FOODS), []);

  const spin = () => {
    if (spinning) return;
    const count = items.length;
    const slice = 360 / count;
    const selectedIndex = Math.floor(Math.random() * count);
    const selectedCenter = (selectedIndex + 0.5) * slice;
    const targetNorm = (360 - selectedCenter) % 360;
    const currentNorm = ((rotation % 360) + 360) % 360;
    const deltaNorm = (targetNorm - currentNorm + 360) % 360;
    const extraRounds = 6 * 360;
    const nextRotation = rotation + extraRounds + deltaNorm;

    setSpinning(true);
    setResult('');
    setRotation(nextRotation);

    window.setTimeout(() => {
      setResult(items[selectedIndex]);
      setSpinning(false);
    }, 4200);
  };

  return (
    <Layout title="今天吃什么转盘" description="一个用于决定今天吃什么的随机转盘页面">
      <main className={styles.page}>
        <h1 className={styles.title}>今天吃什么</h1>
        <p className={styles.subtitle}>点一下转盘，立刻解决选择困难。</p>
        <div className={styles.advanced}>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={isOutdoor}
              disabled={spinning}
              onChange={e => {
                setIsOutdoor(e.target.checked);
                setResult('');
              }}
            />
            高级选项：外出
          </label>
          <p className={styles.modeHint}>
            当前数据表：{isOutdoor ? '外出' : '日常'}
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.pointer} />
          <div className={`${styles.flipper} ${isOutdoor ? styles.flipped : ''}`}>
            <div className={styles.face}>
              <div
                className={styles.wheel}
                style={{
                  background: homeGradient,
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? 'transform 4.2s cubic-bezier(0.15, 0.75, 0.1, 1)'
                    : 'none',
                }}>
                {homeLabels.map(({item, left, top}) => (
                  <span key={item} className={styles.label} style={{left, top}}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${styles.face} ${styles.backFace}`}>
              <div
                className={styles.wheel}
                style={{
                  background: outdoorGradient,
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? 'transform 4.2s cubic-bezier(0.15, 0.75, 0.1, 1)'
                    : 'none',
                }}>
                {outdoorLabels.map(({item, left, top}) => (
                  <span key={item} className={styles.label} style={{left, top}}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className={styles.spinButton} onClick={spin} disabled={spinning}>
          {spinning ? '转动中...' : '开始转盘'}
        </button>

        <p className={styles.result}>
          {result ? `今天吃：${result}` : ' '}
        </p>
      </main>
    </Layout>
  );
}
