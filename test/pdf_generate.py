# from sqlalchemy import create_engine, text
from fpdf import FPDF, XPos, YPos

# engine = create_engine("mysql+mysqlconnector://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")

class PDF(FPDF):
    def header(self, title):
        self.image('DataWiz-Logo.png', 10, 8, 20)
        self.set_font('helvetica', 'B', 20)

        title_w = self.get_string_width(title) + 6
        doc_w = self.w
        self.set_x((doc_w - title_w)/2)

        self.set_text_color(220, 50, 50)

        self.set_line_width(1)

        self.cell(title_w, 10, title, align='C')
        self.ln(20)


    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 10)
        self.set_text_color(169, 169, 169)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')


    def chapter_title(self, ch_num, ch_title):
        self.set_font('helvetica', '', 12)
        self.set_fill_color(200, 220, 255)
        chapter_title = f'Chapter {ch_num}: {ch_title}'
        self.cell(0, 5, chapter_title, ln=1, fill=1)
        self.ln()


    def chapter_body(self, name):
        with open(name, 'rb') as fh:
            txt = fh.read().decode('latin-1')

        self.set_font('times', '', 12)
        self.multi_cell(0, 5, txt)
        self.ln()
        self.set_font('times', 'I', 12)
        self.multi_cell(0, 5, 'End of chapter!')



    def print_chapter(self, ch_num, ch_title, name):
        self.add_page()
        self.chapter_title(ch_num, ch_title)
        self.chapter_body(name)


pdf = PDF('P', 'mm', 'A4')