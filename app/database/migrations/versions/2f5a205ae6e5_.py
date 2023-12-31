"""empty message

Revision ID: 2f5a205ae6e5
Revises: 2ba603a6001f
Create Date: 2023-12-04 00:44:24.420180

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f5a205ae6e5'
down_revision = '2ba603a6001f'
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def upgrade_prefixed():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Product',
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('product_name', sa.String(length=50), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('product_id')
    )
    op.create_table('Inventory',
    sa.Column('inventory_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('inv_ProductID', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['inv_ProductID'], ['Product.product_id'], ),
    sa.PrimaryKeyConstraint('inventory_id')
    )
    # ### end Alembic commands ###


def downgrade_prefixed():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Inventory')
    op.drop_table('Product')
    # ### end Alembic commands ###

