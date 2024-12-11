export default function SlideCardLayout({
  backGround,
  isSectionFav = false,
  plateText = '',
  textPosition = 'center',
  title = '',
  textColor = '#ffffff',
  children,
}) {
  console.log(backGround);

  return (
    <div
      className={`relative bg-cover bg-center bg-no-repeat overflow-hidden font-raleway w-[100%] h-[500px] py-[136px]  px-[193px]  rounded-[15px]  mdOnly:h-[280px] mdOnly:rounded-[10px] mdOnly:py-[45px] mdOnly:px-[91px] smOnly:h-[224px] smOnly:rounded-[10px] smOnly:py-[36px] smOnly:px-[5%]`}
      id={isSectionFav ? 'sectionFav' : null}
      style={{
        backgroundImage: `url(${backGround})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: textPosition,
      }}
    >
      <div
        className='p-[10px] leading-none bg-white text-[#202020] rounded-lg font-normal
        text-20px mdOnly:text-18px smOnly:text-[11px]'
        style={{ maxWidth: 'fit-content' }}
      >
        <p className=''>{plateText}</p>
      </div>
      <h2
        className='text-40px font-[600] max-w-[700px] leading-[1.17] mdOnly:text-30px
        smOnly:text-20px notXl:text-white'
        style={{ color: textColor, textAlign: textPosition }}
      >
        {title}
      </h2>
      <p
        className='font-medium text-30px leading-[1.17] max-w-[950px] mdOnly:text-20px
        smOnly:text-[15px]'
        style={{ color: textColor, textAlign: textPosition }}
      >
        {children}
      </p>
    </div>
  );
}
