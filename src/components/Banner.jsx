export default function Banner() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        <span>🎁 VOUCHER 80K ĐƠN TỪ 999K</span>
        <span>🚚 FREESHIP ĐƠN TỪ 299K</span>
        <span>🔥 ƯU ĐÃI CUỐI TUẦN – MUA NGAY</span>
      </div>

      {/* nhân đôi để cuộn mượt */}
      <div className="marquee-track">
        <span>🎁 VOUCHER 80K ĐƠN TỪ 999K</span>
        <span>🚚 FREESHIP ĐƠN TỪ 299K</span>
        <span>🔥 ƯU ĐÃI CUỐI TUẦN – MUA NGAY</span>
      </div>
    </div>
  );
}
