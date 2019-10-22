import Vue from 'vue'

import '../styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import {
    Quasar,
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QInput,
    QScrollArea,
    QImg,
    QAvatar,
    Ripple,
    QParallax,
    QCard,
    QCardSection,
    QBtnGroup,
    QTooltip,
    Notify,
    QSlideItem,
    QSpinnerGears,
    QPopupEdit,
    QCardActions,
    QChatMessage,
} from 'quasar'

Vue.use(Quasar, {
    config: {},
    components: {
        QLayout,
        QHeader,
        QDrawer,
        QPageContainer,
        QPage,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QInput,
        QScrollArea,
        QImg,
        QAvatar,
        QParallax,
        QCard,
        QCardSection,
        QBtnGroup,
        QTooltip,
        QSlideItem,
        QSpinnerGears,
        QPopupEdit,
        QCardActions,
        QChatMessage,
    },
    directives: {
        Ripple
    },
    plugins: {
        Notify
    }
});
