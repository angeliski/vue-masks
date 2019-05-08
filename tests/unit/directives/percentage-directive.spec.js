import { mount } from "@vue/test-utils";

import percentage from "@/directives/percentage-directive";

describe("Diretiva percentage", () => {
  describe("deve renderizar o valor inicial", () => {
    test("com 2 casas quando não informar", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage :value="value" />'
        },
        {
          data() {
            return {
              value: 0.01
            };
          },
          directives: {
            percentage
          }
        }
      );

      expect(wrapper.vm.$el.value).toBe("0,01%");
    });

    test("com o número de casas decimais informadas", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage="3" :value="value" />'
        },
        {
          data() {
            return {
              value: 0.01
            };
          },
          directives: {
            percentage
          }
        }
      );

      expect(wrapper.vm.$el.value).toBe("0,010%");
    });

    test("zerado quando não houver valor", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage :value="value" />'
        },
        {
          data() {
            return {
              value: null
            };
          },
          directives: {
            percentage
          }
        }
      );

      expect(wrapper.vm.$el.value).toBe("0,00%");
    });

    test("sem nenhuma casa decimal", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage.integer :value="value" />'
        },
        {
          data() {
            return {
              value: null
            };
          },
          directives: {
            percentage
          }
        }
      );

      expect(wrapper.vm.$el.value).toBe("0%");
    });
  });

  describe("deve formatar o valor quando", () => {
    test("digitar letras", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage :value="value" />'
        },
        {
          data() {
            return {
              value: null
            };
          },
          directives: {
            percentage
          }
        }
      );

      const textInput = wrapper.find("input");
      textInput.setValue("valor");
      expect(wrapper.vm.$el.value).toBe("0,00%");
    });

    test("digitar um novo valor", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage :value="value" />'
        },
        {
          data() {
            return {
              value: null
            };
          },
          directives: {
            percentage
          }
        }
      );

      const textInput = wrapper.find("input");
      textInput.setValue("45,4%5");
      expect(wrapper.vm.$el.value).toBe("45,45%");
    });

    test("apagar o último digito (%)", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage :value="value" />'
        },
        {
          data() {
            return {
              value: null
            };
          },
          directives: {
            percentage
          }
        }
      );

      const textInput = wrapper.find("input");
      textInput.setValue("45,45");
      expect(wrapper.vm.$el.value).toBe("4,54%");
    });

    test("digitar um valor que não é inteiro", () => {
      const wrapper = mount(
        {
          template: '<input v-percentage.integer :value="value" />'
        },
        {
          data() {
            return {
              value: null
            };
          },
          directives: {
            percentage
          }
        }
      );

      const textInput = wrapper.find("input");
      textInput.setValue("45,4%");
      expect(wrapper.vm.$el.value).toBe("454%");
    });
  });
});
