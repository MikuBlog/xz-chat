export default {
  data() {
    return {
      emoji: {
        title: "emoji",
        type: "emoji",
        content: ["😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "🦉", "🐦", "😃", "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "💋", "👋", "🤚", "🖐", "✋", "🖖", "👌", "✌", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍", "💅", "🤳", "💪", "🦵", "🦶", "👂", "👃", "🧠", "🦷", "🦴", "👀", "👁", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩", "👩‍🦰", "👩‍🦱", "👩‍🦳", "👩‍🦲", "👱‍♀️", "👱‍♂️", "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "👨‍⚕️", "👩‍⚕️", "👨‍🎓", "👩‍🎓", "👨‍🏫", "👩‍🏫", "👨‍⚖️", "👩‍⚖️", "👨‍🌾", "👩‍🌾", "👨‍🍳", "👩‍🍳", "👨‍🔧", "👩‍🔧", "👨‍🏭", "👩‍🏭", "👨‍💼", "👩‍💼", "👨‍🔬", "👩‍🔬", "👨‍💻", "👩‍💻", "👨‍🎤", "👩‍🎤", "👨‍🎨", "👩‍🎨", "👨‍✈️", "👩‍✈️", "👨‍🚀", "👩‍🚀", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵", "👰", "🤰", "🤱", "👼", "🎅", "🤶", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🕴", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖‍♂️", "🧖‍♀️", "🧘", "👭", "👫", "👬", "💏", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "💑", "👨‍❤️‍👨", "👩‍❤️‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣", "👤", "👥", "👣", "🧳", "🌂", "☂", "🧵", "🧶", "👓", "🕶", "🥽", "🥼", "👔", "👕", "👖", "🧣", "🧤", "🧥", "🧦", "👗", "👘", "👙", "👚", "👛", "👜", "👝", "🎒", "👞", "👟", "🥾", "🥿", "👠", "👡", "👢", "👑", "👒", "🎩", "🎓", "🧢", "⛑", "💄", "💍", "💼", "😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "❤", "🥺", "😂", "🥰", "🔥", "😊", "😍", "🎄", "🤍", "🤏", "🦥", "😍", "⏩", "🇹🇼", "📲", "🦑", "🐙", "🙋", "🇦🇺", "🇫🇷", "🎂", "🛍", "🇨🇦", "🇧🇷", "🐉", "🎅", "🇲🇽", "🕯", "🇨🇳", "🐰", "🎥", "🍂", "👨", "💪", "🎓", "🔥", "🎃", "🕎", "💕", "🕉", "🇺🇸", "👩", "🎊", "🏊", "🏳️‍🌈", "👑", "☪", "🌱", "☘", "☀", "🏈", "🦃", "💘", "👰", "⛄", "🎿", "⚽", "🌎",]
      },
      animal: {
        title: "动物",
        type: "emoji",
        content: ["😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "🦉", "🐦", "🐻", "🙈", "🙉", "🙊", "💥", "💫", "💦", "💨", "🐵", "🐒", "🦍", "🐶", "🐕", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿", "🦔", "🦇", "🐻", "🐨", "🐼", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊", "🦅", "🦆", "🦢", "🦉", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🐞", "🦗", "🕷", "🕸", "🦂", "🦟", "🦠", "💐", "🌸", "💮", "🏵", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘", "🍀", "🍁", "🍂", "🍃", "🍄", "🌰", "🦀", "🦞", "🦐", "🦑", "🌍", "🌎", "🌏", "🌐", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌙", "🌚", "🌛", "🌜", "☀", "🌝", "🌞", "⭐", "🌟", "🌠", "☁", "⛅", "⛈", "🌤", "🌥", "🌦", "🌧", "🌨", "🌩", "🌪", "🌫", "🌬", "🌈", "☂", "☔", "⚡", "❄", "☃", "⛄", "☄", "🔥", "💧", "🌊", "🎄", "✨", "🎋", "🎍", "😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "❤", "🥺", "😂", "🥰", "🔥", "😊", "😍", "🎄", "🤍", "🤏", "🦥", "😍", "⏩", "🇹🇼", "📲", "🦑", "🐙", "🙋", "🇦🇺", "🇫🇷", "🎂", "🛍", "🇨🇦", "🇧🇷", "🐉", "🎅", "🇲🇽", "🕯", "🇨🇳", "🐰", "🎥", "🍂", "👨", "💪", "🎓", "🔥", "🎃", "🕎", "💕", "🕉", "🇺🇸", "👩", "🎊", "🏊", "🏳️‍🌈", "👑", "☪", "🌱", "☘", "☀", "🏈", "🦃", "💘", "👰", "⛄", "🎿", "⚽", "🌎",
        ]
      },
      food: {
        title: "食物",
        type: "emoji",
        content: ["😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "🦉", "🐦", "🍔", "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶", "🥒", "🥬", "🥦", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🥢", "🍽", "🍴", "🥄", "😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "❤", "🥺", "😂", "🥰", "🔥", "😊", "😍", "🎄", "🤍", "🤏", "🦥", "😍", "⏩", "🇹🇼", "📲", "🦑", "🐙", "🙋", "🇦🇺", "🇫🇷", "🎂", "🛍", "🇨🇦", "🇧🇷", "🐉", "🎅", "🇲🇽", "🕯", "🇨🇳", "🐰", "🎥", "🍂", "👨", "💪", "🎓", "🔥", "🎃", "🕎", "💕", "🕉", "🇺🇸", "👩", "🎊", "🏊", "🏳️‍🌈", "👑", "☪", "🌱", "☘", "☀", "🏈", "🦃", "💘", "👰", "⛄", "🎿", "⚽", "🌎",
        ]
      },
      activity: {
        title: "活动",
        type: "emoji",
        content: ["😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "🦉", "🐦", "⚽", "🕴", "🧗", "🧗‍♂️", "🧗‍♀️", "🏇", "⛷", "🏂", "🏌", "🏌️‍♂️", "🏌️‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🏊", "🏊‍♂️", "🏊‍♀️", "⛹", "⛹️‍♂️", "⛹️‍♀️", "🏋", "🏋️‍♂️", "🏋️‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🤾", "🤾‍♂️", "🤾‍♀️", "🤹", "🤹‍♂️", "🤹‍♀️", "🧘", "🧘‍♂️", "🧘‍♀️", "🎪", "🛹", "🎗", "🎟", "🎫", "🎖", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "⚾", "🥎", "🏀", "🏐", "🏈", "🏉", "🎾", "🥏", "🎳", "🏏", "🏑", "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "⛳", "⛸", "🎣", "🎽", "🎿", "🛷", "🥌", "🎯", "🎱", "🎮", "🎰", "🎲", "🧩", "♟", "🎭", "🎨", "🧵", "🧶", "🎼", "🎤", "🎧", "🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎬", "🏹", "😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "❤", "🥺", "😂", "🥰", "🔥", "😊", "😍", "🎄", "🤍", "🤏", "🦥", "😍", "⏩", "🇹🇼", "📲", "🦑", "🐙", "🙋", "🇦🇺", "🇫🇷", "🎂", "🛍", "🇨🇦", "🇧🇷", "🐉", "🎅", "🇲🇽", "🕯", "🇨🇳", "🐰", "🎥", "🍂", "👨", "💪", "🎓", "🔥", "🎃", "🕎", "💕", "🕉", "🇺🇸", "👩", "🎊", "🏊", "🏳️‍🌈", "👑", "☪", "🌱", "☘", "☀", "🏈", "🦃", "💘", "👰", "⛄", "🎿", "⚽", "🌎",

        ]
      },
      place: {
        title: "地点",
        type: "emoji",
        content: ["😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "🦉", "🐦", "🌇", "🚣", "🗾", "🏔", "⛰", "🌋", "🗻", "🏕", "🏖", "🏜", "🏝", "🏞", "🏟", "🏛", "🏗", "🏘", "🏚", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🕍", "⛩", "🕋", "⛲", "⛺", "🌁", "🌃", "🏙", "🌄", "🌅", "🌆", "🌇", "🌉", "🎠", "🎡", "🎢", "🚂", "🚃", "🚄", "🚅", "🚆", "🚇", "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚍", "🚎", "🚐", "🚑", "🚒", "🚓", "🚔", "🚕", "🚖", "🚗", "🚘", "🚚", "🚛", "🚜", "🏎", "🏍", "🛵", "🚲", "🛴", "🚏", "🛤", "⛽", "🚨", "🚥", "🚦", "🚧", "⚓", "⛵", "🚤", "🛳", "⛴", "🛥", "🚢", "✈", "🛩", "🛫", "🛬", "💺", "🚁", "🚟", "🚠", "🚡", "🛰", "🚀", "🛸", "🌠", "🌌", "⛱", "🎆", "🎇", "🎑", "💴", "💵", "💶", "💷", "🗿", "🛂", "🛃", "🛄", "🛅", "😃", "🐻", "🍔", "⚽", "🌇", "💡", "🔣", "🎌", "❤", "🥺", "😂", "🥰", "🔥", "😊", "😍", "🎄", "🤍", "🤏", "🦥", "😍", "⏩", "🇹🇼", "📲", "🦑", "🐙", "🙋", "🇦🇺", "🇫🇷", "🎂", "🛍", "🇨🇦", "🇧🇷", "🐉", "🎅", "🇲🇽", "🕯", "🇨🇳", "🐰", "🎥", "🍂", "👨", "💪", "🎓", "🔥", "🎃", "🕎", "💕", "🕉", "🇺🇸", "👩", "🎊", "🏊", "🏳️‍🌈", "👑", "☪", "🌱", "☘", "☀", "🏈", "🦃", "💘", "👰", "⛄", "🎿", "⚽", "🌎",
        ]
      }
    }
  }
}