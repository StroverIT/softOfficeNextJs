import React from "react";

import Head from "next/head";

export default function abousUs() {
  return (
    <>
      <Head></Head>
      <main className="mb-auto ">
        <div className="container mt-10 mb-10 lg:mb-14">
          <h3 className="mb-5 text-3xl uppercase text-semibold">За нас</h3>
          <div className="text-[#444]">
            <p className="mb-1">
              Фирма<span className="font-medium">ivdaGeo</span> е създадена през
              1992г. От малък квартален магазин, собствениците на фирмата го
              разрастват до магазин Клас А. С годините, номенклатурата от
              предлагани стоки непрекъснато се увеличава, следвайки стремежа да
              се отговори на нуждите на пазара. При нас можете да намерите
              всичко за поддръжка на вашия дом, офис или производствена база. В
              момента фирмата предлага над 17 00 артикула от всички области на
              строителството – строителни материали, елекромателиали, ВиК,
              крепежи, битова химия, осветителни тела, инструменти и много
              други. „ivdaGeo” е надежден и коректен партньор на редица
              български и чуждестранни компании, които се занимават с
              производство и дистрибуция на строителни материали.
            </p>
            <p className="">
              През годините сме спечелили доверието на нашите клиенти с
              професионално обслужване и коректност, както и съобразени с пазара
              конкурентни цени. Доказателство за професионализма на състава, са
              здравите връзки с много фирми и производители. Младият и
              амбициозен колектив ще откликне с готовност на всички ваши въпроси
              свързани с консултации относно най – подходящия продукт за вас,
              както и със съвети за използването, монтажа, съхраняването на
              предлаганите стоки
            </p>
          </div>
          <div className="mt-5">
            <ul className="text-gray-[#444]">
              <li className="py-1">
                <span className="pr-2 font-semibold text-dark">
                  Заповядайте в нашия магазин:
                </span>
                <br />
                гр.София ПК-1582 Дружба 2 РУМ Дружба 2 срещу блок 204
              </li>
              <li className="py-1">
                <span className="pr-2 font-semibold text-dark">
                  Тел. / факс:
                </span>
                02/973 15 85
              </li>
              <li className="py-1">
                <span className="pr-1 font-semibold text-dark">GSM:</span> 0888
                900746, 0879 406620
              </li>
              <li>
                <span className="pr-1 font-semibold text-dark">Е-mail:</span>
                ivdaGeoNeshto@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
