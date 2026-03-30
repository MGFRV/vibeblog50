import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ЗакупкиПро — Блог о закупках промышленного оборудования';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '72px',
          background: '#0F4C3A',
          color: '#FFFFFF',
          fontFamily: 'Inter, Arial, sans-serif'
        }}
      >
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>ЗакупкиПро</div>
        <div style={{ marginTop: 24, fontSize: 38, lineHeight: 1.25, maxWidth: 900 }}>
          Блог о закупках промышленного оборудования
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
