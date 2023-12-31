"""empty message

Revision ID: b4d467dcbe39
Revises: a87c1b6cf02d
Create Date: 2023-12-06 21:51:01.642766

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b4d467dcbe39'
down_revision = 'a87c1b6cf02d'
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Quiz', schema=None) as batch_op:
        batch_op.drop_column('descriptipn')

    # ### end Alembic commands ###


def downgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Quiz', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descriptipn', mysql.VARCHAR(length=2000), nullable=True))

    # ### end Alembic commands ###


def upgrade_prefixed():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade_prefixed():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###

