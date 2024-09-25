# api-landing


Лендинг является обычным набором html+css+js файлов, за исключением небольшого билдера.
в /css/ находится два файла - main.css и main.dev.css.

main.css - файл не редактировать. Это билд для продакшена, подключен в index.html. Минифицированный css, содержащий все необходимые пользовательские и технические классы.

Если необходимо внести изменения - вносим их в main.dev.css
main.dev.css - не минифицированная версия без технических классов, где прописаны пользовательские стили. 
@apply используется для добавления к классу определенного Tailwind класса. На одном уровне с @apply может быть обычный css код.

test deploy
Для того чтобы внести изменения (tailwind классы можно добавлять, удалять, менять их набор в index.html, main.dev.css, ./js/main.js), необходимо установить зависимости (npm install), и после - запустить билд командой npm run build. 
Запускается watcher, который будет реагировать на изменения в вышеперечисленных файлах и автоматически создавать обновленный main.css. Стопать его через ctrl(cmd) + C.