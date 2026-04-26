/**
 * Google Apps Script — LoanClock 문의/기능요청 시트 저장
 *
 * 사용법:
 * 1. Google Sheets에서 [확장 프로그램] → [Apps Script] 를 엽니다.
 * 2. 이 코드를 Code.gs 에 붙여넣습니다.
 * 3. 시트 1행(헤더)에 아래 컬럼을 입력합��다:
 *    접수일 | 문의유형 | 세부유형 | 관련계산기 | 제목 | 내용 | 이메일 | 문의작성URL | 이전페이지URL | 상태 | 우선순위 | 처리메모
 * 4. [배포] → [새 배포] → 유형: 웹 앱
 *    - 실행 사용자: 나
 *    - 액세스 권한: 누구나
 * 5. 배포 URL을 복사하여 .env.local 의 VITE_FEEDBACK_WEBHOOK_URL 에 설정합니다.
 *    (Vercel 사용 시 Environment Variables에도 동일하게 추가)
 *
 * 시트 컬럼 순서:
 *   A: 접수일
 *   B: 문의유형
 *   C: 세부유형
 *   D: 관련계산기
 *   E: 제목
 *   F: 내용
 *   G: 이메일
 *   H: 문의작성URL
 *   I: 이전���이지URL
 *   J: 상태
 *   K: 우선순위
 *   L: 처리메모
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date(),                       // 접수일 (자동)
      data.inquiryType || "",           // 문��유형
      data.detailType || "",            // 세부유형
      data.relatedCalculator || "",     // ���련계산기
      data.title || "",                 // 제목
      data.content || "",               // 내용
      data.email || "",                 // 이메일
      data.pageUrl || "",               // 문의작성URL
      data.referrerUrl || "",           // 이전페이지URL
      "접수",                            // 상태 (기본값)
      "",                               // 우선순위 (빈칸)
      "",                               // 처리메모 (빈칸)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
