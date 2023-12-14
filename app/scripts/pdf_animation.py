from fpdf import FPDF
from animation_parser import * 

    
def generate_pdf(q: str):
    data, columns = pdf_animation(q)
    table = []
    for i in range(0, len(data)):
        print(columns[i])
        for x in data[i]:
            print(x)
        print()
    


qry = "Select count(artist_id), country, Genre.genre_id FROM Artist JOIN Genre ON Artist.genre_id = Genre.genre_id GROUP BY country ORDER BY Genre.genre_id asc"
generate_pdf(qry)
