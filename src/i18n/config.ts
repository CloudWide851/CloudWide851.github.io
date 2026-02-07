import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../locales/en/common.json';
import enHome from '../locales/en/home.json';
import enLab from '../locales/en/lab.json';
import zhCommon from '../locales/zh/common.json';
import zhHome from '../locales/zh/home.json';
import zhLab from '../locales/zh/lab.json';

import enAbout from '../locales/en/about.json';
import enProjects from '../locales/en/projects.json';
import enBlog from '../locales/en/blog.json';
import enNotfound from '../locales/en/notfound.json';
import zhAbout from '../locales/zh/about.json';
import zhProjects from '../locales/zh/projects.json';
import zhBlog from '../locales/zh/blog.json';
import zhNotfound from '../locales/zh/notfound.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    lab: enLab,
    about: enAbout,
    projects: enProjects,
    blog: enBlog,
    notfound: enNotfound,
  },
  zh: {
    common: zhCommon,
    home: zhHome,
    lab: zhLab,
    about: zhAbout,
    projects: zhProjects,
    blog: zhBlog,
    notfound: zhNotfound,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
