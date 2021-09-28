import BaseButton from '~/components/argon-core/BaseButton.vue';
import BaseCheckbox from '~/components/argon-core/Inputs/BaseCheckbox.vue';
import BaseInput from '~/components/argon-core/Inputs/BaseInput.vue';
import BaseRadio from "~/components/argon-core/Inputs/BaseRadio";
import Card from '~/components/argon-core/Cards/Card.vue';
import { Input, Tooltip, Popover } from 'element-ui';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Vue from 'vue';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseRadio.name, BaseRadio);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

