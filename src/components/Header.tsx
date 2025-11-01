function Header() {
  return (
    <div dir="rtl" className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-right">فاکتور</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium">شماره فاکتور</label>
            <input
              type="text"
              placeholder="شماره فاکتور را وارد کنید"
              className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium">نام خریدار</label>
            <input
              type="text"
              placeholder="نام خریدار را وارد کنید"
              className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium">تاریخ</label>
            <input
              type="date"
              className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium">آدرس</label>
            <input
              type="text"
              placeholder="آدرس را وارد کنید"
              className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
