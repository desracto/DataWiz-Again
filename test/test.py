from sqlparse import parse
from sqlparse.sql import IdentifierList, Identifier, Token

from sqlra2 import translate_query

def ret_column_names(query: str):
    stmt_dict = translate_query(query,
                                DEBUG=False, 
                                CLEAN=True)
    
    # column names
    column_names = stmt_dict['SELECT']

    # table names if wildcard present
    if '*' in query:



# def retrieve_column_names(query: str):
#     parsed_tokens = parse(query)[0].tokens
#     columns = []
#     tables = [] # when wildcard present

#     wildcard = False
#     if '*' in query:
#         wildcard = True

#     select_section = False
#     for token in parsed_tokens:
#         if token.is_whitespace:
#             continue

#         if token.value == 'SELECT' or token.value == 'DISTINCT':
#             select_section = True
#             continue

#         if select_section:
#             columns.append(token)

#         if token.is_keyword:
#             break


#         if wildcard:
#             if token.value == 'FROM':
                


#     # clean the column tokens
#     cleaned_columns = []
#     for column in columns:
#         if type(column) == IdentifierList:
#             cols = [x.value for x in column.tokens if not x.value in [',', ' ']]
#             cleaned_columns.extend(cols)

#         elif type(column) in  [Identifier, Token]:
#             cleaned_columns.append(column.value)

#     return cleaned_columns
    
if __name__ == '__main__':
    # print(retrieve_column_names('SELECT * FROM Employee'))
    print(ret_column_names('SELECT * FROM Employee, Product'))