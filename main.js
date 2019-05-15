(function() {
    'use strict'; // エラーチェック

    // 変数に代入
    var price = document.getElementById('price');
    var num = document.getElementById('num');
    var unit = document.getElementById('unit');
    var btn = document.getElementById('btn');
    var result = document.getElementById('result');
    var reset = document.getElementById('reset');

    price.focus(); //金額にフォーカスを当てる

    // 入力内容のチェック
    function checkInput() {
        // 正規表現を使い入力値のチェック（一桁目は1-9どれか、二桁目があれば0-9のどれか）
        // /^[1-9][0-9]*$/
        if (
            price.value.match(/^[1-9][0-9]*$/) !== null &&
            num.value.match(/^[1-9][0-9]*$/) !== null
        ) {
            btn.classList.remove('disabled');
        } else {
            btn.classList.add('disabled');
        }

    }

    // ボタンクリック時の処理
    btn.addEventListener('click', function() {
        // 変数の宣言
        var payLess;
        var short;
        var payMore;
        var over;
        var str;

        // ボタンにdisableクラスを付け、ボタンを押しても処理が走らないようにする
        if (this.classList.contains('disabled') === true) {
            return;
        }

        // A. 300円払って(payLess) 100円足りない(short)
        // B. 400円払って(payMore) 200円余る(over)
        // payLess = 1000 /3; // 333.333...
        // payLess = 1000 /3 / 100; // 3.33333...
        // 切り捨て
        payLess = Math.floor(price.value / num.value / unit.value) * unit.value; // 300
        short = price.value - (payLess * num.value); // 100
        // 繰り上げ
        payMore = Math.ceil(price.value / num.value / unit.value) * unit.value; // 400
        // -になるので Math.absを使い絶対値に変換
        over = Math.abs(price.value - (payMore * num.value)); // -200

        if (short === 0 && over === 0) {
            str = '1人 ' + (price.value / num.value) + '円ちょうどです！';
        } else {
            str =
            '1人 ' + payLess + '円だと ' + short + '円足りません。' +
            '1人 ' + payMore + '円だと ' + over + '円余ります。';
        }
        result.textContent = str;
        reset.classList.remove('hidden');
    });

    // 金額、人数の入力時にチェック
    price.addEventListener('keyup', checkInput);
    num.addEventListener('keyup', checkInput);

    // resetをクリックしたときの処理（初期状態に戻す）
    reset.addEventListener('click', function(){
        result.textContent = 'ここに結果を表示'; // 結果表示のメッセージ初期化
        price.value = ''; // 金額を空に
        num.value = ''; // 人数を空に
        unit.value = '100'; // セレクトボックスを100に
        btn.classList.add('disabled'); // ボタンを押せないように
        this.classList.add('hidden'); // この要素（reset）にhiddenクラスを追加
        price.focus(); //金額にフォーカスを当てる
    });

})();