// 계산기 레지스트리 초기화
import { registerConfig } from "./registry";
import creditConfig from "./configs/credit";
import refinanceConfig from "./configs/refinance";
import jeonseConfig from "./configs/jeonse";
import dsrConfig from "./configs/dsr";
import mortgageConfig from "./configs/mortgage";
import autoConfig from "./configs/auto";
import beotimmokJeonseConfig from "./configs/beotimmokJeonse";
import jeonseLoanInterestConfig from "./configs/jeonseLoanInterest";
import didimdolConfig from "./configs/didimdol";
import bogeumjariConfig from "./configs/bogeumjari";
import monthlyRentLoanConfig from "./configs/monthlyRentLoan";
import firstHomeConfig from "./configs/firstHome";

// 모든 계산기 config 등록
registerConfig(creditConfig);
registerConfig(refinanceConfig);
registerConfig(jeonseConfig);
registerConfig(dsrConfig);
registerConfig(mortgageConfig);
registerConfig(autoConfig);
registerConfig(beotimmokJeonseConfig);
registerConfig(jeonseLoanInterestConfig);
registerConfig(didimdolConfig);
registerConfig(bogeumjariConfig);
registerConfig(monthlyRentLoanConfig);
registerConfig(firstHomeConfig);

export { getConfig, getAllConfigs, CALCULATOR_NAV } from "./registry";
export { default as CalculatorPage } from "./CalculatorPage";
export { default as IntroPage } from "./IntroPage";
