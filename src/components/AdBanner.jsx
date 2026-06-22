export default function AdBanner() {
  return (
    <div className="w-full my-8">
      <div className="text-center text-sm text-gray-500 mb-2">
        <p>Advertisement</p>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  );
}
