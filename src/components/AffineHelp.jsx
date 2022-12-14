import React from "react";

const AffineHelp = () => {


    return (
        <div>
            <div className="component-help">
                <div className="videoHelp">
                    <iframe width="480" height="300" src="https://www.youtube.com/embed/E3Phj6J287o"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </div>
                <div className="header">
                    <h3>Що таке афінні перетворення?</h3>
                </div>
                <p className="textRef">Детальніше про афінні перетворення: <a href="https://uk.wikipedia.org/wiki/%D0%90%D1%84%D1%96%D0%BD%D0%BD%D0%B5_%D0%BF%D0%B5%D1%80%D0%B5%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D0%BD%D1%8F" target="_blank" rel="noopener noreferrer">https://uk.wikipedia.org/wiki/Affine</a></p>
                <p className="text">Афінне перетворення (лат. affinis, «пов'язаний з») — відображення площини або простору в собі, при якому паралельні прямі переходять у паралельні прямі, пересічні — в пересічні, мимобіжні — в мимобіжні.</p>
                <p className="text">Афінним називається перетворення, що має такі властивості:
                    <p className="innerP">● будь-яке афінне перетворення може бути представлене як послідовність операцій з числа найпростіших: зсув, розтягнення/стиснення, поворот;</p>
                    <p className="innerP">● зберігаються прямі лінії, паралельність прямих, відношення довжин відрізків, що лежать на одній
                        прямій, і відношення площ фігур.</p>
                </p>
                <img src="../images/affine.png" alt="Affine" width={750} height={450} />
                <p className="text">Зазвичай матрично-векторний добуток завжди відображає початок координат на початок координат, і, таким чином, не може представляти перенесення, яке обов'язково переносить початок координат в іншу точку. Додаванням «1» до кожного вектора, вважаємо простір відображенним на підмножину простору з одним додатковим виміром. В цьому просторі, початковий простір займає підмножину в якій останній індекс 1. Таким чином початок координат початкового простору буде знаходитися в (0,0, … 0, 1). Перенесення всередині початкового простору в термінах лінійного перетворення простору з більшою кількістю вимірів стає можливим. Це є приклад однорідних координат.</p>
                <div className="header">
                    <h3>Матриця перетворень</h3>
                </div>
                <p className="text">
                    Складним (комбінованим) називається перетворення, яке містить ланцюжок базових перетворень (не
                    менше двох). Зауважимо, що майже всі афінні перетворення залежать від порядку їх виконання. Наприклад,
                    перетворення повороту не комутативні.
                </p>
                <p className="text">Найчастіше на практиці для визначення матриці перетворень використовують рівняння:</p>
                <p className="text">M=K^-1*K*,</p>
                <p className="text">що випливає із рівняння афінних перетворень K* = K * M, де K – матриця координат об’єкту до перетворення,
                    K* – після перетворення, М – матриця перетворення.</p>
                <div className="header">
                    <h3>Деякі правила виконання перетворень</h3>
                </div>
                <p className="text">Для представлення даних та виконання різноманітних перетворень використовуються певні узгодження.
                    Найбільшу увагу потрібно приділяти формулюванню завдання та інтерпретації результатів. Наприклад, перед
                    виконанням повороту необхідно отримати відповіді на наступні питання:</p>
                <p className="innerP">● У правосторонній чи лівосторонній системі координат? </p>
                <p className="innerP">● Обертається об'єкт або система координат?</p>
                <p className="innerP">● Поворот здійснюється за чи проти годинникової стрілки?</p>
                <p className="innerP">● Координати записуються у вигляді рядка або стовпця матриці?</p>
                <p className="innerP">● Навколо якої лінії або осі здійснюється поворот?</p>

            </div>
        </div>
    );
};

export default AffineHelp;